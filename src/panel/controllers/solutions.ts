import { findIndex } from "lodash";
import { app } from "../index";
import { setAppData, zoomSolution } from "../actions";

const controller = ($scope, redux) => {
  const mapStateToProps = (state: IRootReducer) => {
    const { isIdle, solutions } = state.flow;
    return {
      enabled: isIdle,
      items: solutions,
      selected: state.settings.getIn(["solutions"]).toArray(),
    };
  };

  const disconnect = redux.connect(mapStateToProps)($scope);
  $scope.$on("$destroy", disconnect);

  $scope.setTitle = function(index: number) {
    return index + 1;
  };

  $scope.update = function(next: number) {
    // Single-selected mode
    const prev = findIndex(this.selected, x => x);
    const selection = [];
    selection[next] = true;
    this.dispatch(setAppData({solutions: selection}));

    // Highlight solution in ILST
    this.dispatch(zoomSolution(next, prev)).catch(err => {
      console.log(err);
    });

  };
};

app.controller("ctrlSolutions", ["$scope", "$ngRedux", controller]);
