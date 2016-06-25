/**
 * Update state along with scope, use in conjuction with ng-model
 */
import { isUndefined, isEqual } from "lodash";
import { app } from "../index";

const link = (scope, element, attrs) => {
  const prop = attrs.ngModel || attrs.imlImmutable;
  const keyPath = prop.split(".");
  const root = attrs.imlReducer || "opt";
  if (keyPath[0] === root) {
    keyPath.shift();
  }

  scope.$watch(prop, (next, prev) => {
    if (isUndefined(next) || isEqual(next, prev)) {
      return;
    }
    scope.setAppData(keyPath, next);
  });
};

const directive = () => {
  return {
    link,
    restrict: "A",
  };
};

app.directive("imlImmutable", [directive]);
