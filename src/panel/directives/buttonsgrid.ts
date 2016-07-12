import { app } from "../index";

const css = {
  activeWidthClass: "iml-width--selected",
  disabledState: "iml-width--disabled",
  widthsClass: "iml-width",
  wrapperClass: "iml-widths",
};

const wrapper = `<div class="${css.wrapperClass}">
  <span
    ng-class="stickClasses()"
    ng-click="toggle({item: $index})"
    ng-repeat="item in items track by $index">
  <span>{{setTitle({item: $index})}}</span>
</div>`;

const directive = ($compile) => {
  return {
    link: (scope, element) => {
      scope.stickClasses = function() {
        let classes = [ css.widthsClass ];
        if (this.selected[this.$index]) {
          classes.push(css.activeWidthClass);
        }
        if (!scope.enabled) {
          classes.push(css.disabledState);
        }
        return classes.join(" ");
      };

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
