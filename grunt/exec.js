"use strict";

const path = require("path");

/**
 * Shortcut to platform
 *
 * @var {boolean}
 */
const isWindows = process.platform === 'win32';

/**
 * Spread changes on remote machines using rsync
 *
 * Export env var before `grunt exec:sync`:
 * export GRUNT_HOSTS="192.168.0.152[,192.168.0.153[:8011]]"
 *   ip   -- IP address, mandatory
 *   port -- optional, default is 8011
 *
 * On remote end rsync runs as a daemon with `package.name` stanza
 */
let exec = "echo 'No GRUNT_HOSTS exported'"; // No need to sync...
// ... or harvest remotes
if (process.env.GRUNT_HOSTS) {
  const devHosts = process.env.GRUNT_HOSTS.split(',');
  const commands = devHosts.map(host => {
    const params = host.split(':');
    const devHostIp = params[0];
    const devHostPort = params[1] || 8011;
    const command = [
      // @fixme replace `echo` with cygwin path
      isWindows ? "echo" : "/usr/bin/rsync",
      "-avz",
      "--exclude *.swp",
      `--port ${devHostPort}`,
      "<%= dist %>/",
      `${devHostIp}::<%= pkg.name %>`
    ];
    return command.join(" ");
  });
  exec = commands.join(";");
}

const dist = path.join(__dirname, "..", "<%= dist %>");
const zxpsign = path.join(__dirname, "..", "misc/installer/ZXPSignCMD", process.arch.replace(/^ia/, "win"), "ZXPSignCmd.exe");
const zxpcert = "misc\\devCert.p12";
const zxppass = "passw0rd";
const zxpfile = "misc\\<%= pkg.name %>.zxp";

module.exports = {
  /**
   * Включение/выключение режима отладки CSXS
   */
  debugon: {
    command: isWindows ? "reg add HKCU\\Software\\Adobe\\CSXS.<%= ccVersion %> /v PlayerDebugMode /d 1 /f" : "defaults write com.adobe.CSXS.<%= ccVersion %> PlayerDebugMode 1"
  },
  debugoff: {
    command: isWindows ? "reg delete HKCU\\Software\\Adobe\\CSXS.<%= ccVersion %> /v PlayerDebugMode /f" : "defaults delete com.adobe.CSXS.<%= ccVersion %> PlayerDebugMode"
  },
  /**
   * Build setup.exe
   */
  installer: {
    command: isWindows ? ["iscc",
      "/Dname=<%= pkg.name %>",
      "/Dversion=<%= pkg.version %>",
      "/Dsources=" + dist,
      "/Durl=<%= pkg.repository.url%>",
      "/Dgitrev=-<%= gitrev %>",
      "misc\\installer\\script.iss"].join(" ") : "echo 'Unsupported platform'"
  },
  /**
   * Signing extension: create self-signed certificate with plain password
   * Once
   */
  selfsign: {
    command: isWindows ? [
      zxpsign,
      "-selfSignedCert",
      "RU", "TAT", "Taflex", "Omerta",
      zxppass,
      zxpcert,
    ].join(" ") : "echo 'Unsupported platform'"
  },
  /**
   * Sign extension with ^^^ certificate
   */
  sign: {
    command: isWindows ? [
      zxpsign,
      "-sign",
      dist,
      zxpfile,
      zxpcert,
      zxppass,
    ].join(" ") : "echo 'Unsupported platform'"
  },
  /**
   * "Complete" distribution with info from signed .zxp package
   */
  signextract: {
    command: [
      "unzip",
      "-o",
      zxpfile,
      "-d " + dist
    ].join(" ")
  },
  /**
   * Синхронизация кода с тестовыми машинами
   */
  sync: {
    command: exec
  },
};
