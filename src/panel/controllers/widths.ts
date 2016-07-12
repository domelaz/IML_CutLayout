import { app } from "../index";
import { setAppData} from "../actions";

const controller = ($scope, redux) => {
  const mapStateToProps = (state: IRootReducer) => {
    return {
      items: state.settings.getIn(["material", "width"]).toArray(),
      selected: state.settings.getIn(["widths"]).toArray(),
    };
  };

  const disconnect = redux.connect(mapStateToProps)($scope);
  $scope.$on("$destroy", disconnect);

  $scope.setTitle = function(index: number) {
    return this.items[index];
  };

  $scope.setWidth = function(index: number) {
    if (this.selected[index]) {
      if (this.selected.length !== 1) {
        delete this.selected[index];
      }
    } else {
      this.selected[index] = this.items[index];
    }
    this.dispatch(setAppData({widths: this.selected}));
  };
};

app.controller("ctrlWidths", ["$scope", "$ngRedux", controller]);
