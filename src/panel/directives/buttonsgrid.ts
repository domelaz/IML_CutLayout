import { app } from "../index";

const css = {
  activeWidthClass: "iml-width--selected",
  widthsClass: "iml-width",
  wrapperClass: "iml-widths",
};

const wrapper = `<div class="${css.wrapperClass}">
  <span
    ng-click="toggle({item: $index})"
    ng-repeat="item in items track by $index">
  <span>{{setTitle({item: $index})}}</span>
</div>`;

const directive = ($compile) => {
  return {
    link: (scope, element) => {
      const toggle = (event) => {
        const target = jQuery(event.target);

        if (target.hasClass(css.wrapperClass)) {
          // Hit between the buttons
          return;
        }

        const value = parseFloat(target.text());

        if (isNaN(value)) {
          return;
        }

        let widths = typeof(scope.widths) === "string"
          ? scope.widths.split(/[ ,]/).map(parseFloat)
          : scope.widths.slice(0);

        if (widths.indexOf(value) === -1) {
          target.addClass(css.activeWidthClass);
          widths.push(value);
        } else {
          if (widths.length > 1) {
            target.removeClass(css.activeWidthClass);
            widths.splice(scope.widths.indexOf(value), 1);
          }
        };
        scope.$apply(() => {
          scope.setAppData({ "widths": widths.sort() });
        });
      };

      element.on("click", toggle);

      element.on("$destroy", () => {
        element.off();
      });

      const content = $compile(wrapper)(scope);
      element.replaceWith(content);
    },

    restrict: "E",
    scope: {
      enabled: "=",
      items: "<",
      selected: "<",
      setTitle: "&setTitle",
      toggle: "&toggle",
    },
    transclude: true,
  };
};

app.directive("imlWidths", ["$compile", directive]);
