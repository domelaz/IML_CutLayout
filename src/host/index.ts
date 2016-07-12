import * as cepHandlers from "./handlers";
import { config } from "../config";

/**
 * Диспетчер команд CEP в Иллюстратор, великий и ужасный.
 *
 * @param {CEPCommand} cmd
 * @returns {string} JSON encoded CEPResponse or CEPError
 */
function marshal(cmd: CEPCommand): string {
  const { handler, data } = cmd;
  const executor = cepHandlers[handler];
  try {
    const result: CEPResponse = executor(data);
    return JSON.stringify(result);
  } catch (error) {
    delete error.source; // Drop source code, too high CPU consumption here
    const facepalm: CEPError = { error, handler };
    return JSON.stringify(facepalm);
  }
}

/**
 * Светим диспетчера в глобальной области, чтобы CEP смог за него зацепиться
 */
$.global[config.connector] = marshal;
