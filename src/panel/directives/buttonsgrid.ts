import { app } from "../index";

const css = {
  activeWidthClass: "iml-width--selected",
  widthsClass: "iml-width",
  wrapperClass: "iml-widths",
};

const render = (values: number[], selected: number[]) => {
  let wrapped = "";
  values.forEach(val => {
    let classes = [css.widthsClass];
    if (selected.lastIndexOf(val) !== -1) {
      classes.push(css.activeWidthClass);
    }
    wrapped += `<span class="${classes.join(" ")}"><span>${val}</span></span>`;
  });
  return `<div class="${css.wrapperClass}">${wrapped}</div>`;
};

const link = (scope, element, attrs) => {
  scope.$watch(attrs.ngModel, (next: IMaterials, prev: IMaterials) => {
    if (next) {
      const data = render(next.width, scope.widths);
      element.html(data);
    }
  }, true);

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
};

const directive = () => {
  return {
    link,
    require: "ngModel",
    restrict: "E",
  };
};

app.directive("imlWidths", [directive]);
