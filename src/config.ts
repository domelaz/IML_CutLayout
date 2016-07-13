export const config: ICommonConfig = {
  connector: "marshal",
  defaults: {
    floatingEdge: 50,
    material: {
      id: "0",
      label: "",
      text: "любой",
      type: "",
      width: [410],
    },
    materialHeight: 444.5,
    materialWidth: 410,
    materials: [
      {
        id: "0",
        label: "",
        text: "любой",
        type: "",
        width: [410],
      }, {
        id: "1",
        label: "пленка белая",
        text: "AISE 105 YUPO SYNTHETIC",
        type: "white",
        width: [235, 250, 252, 255, 380],
      }, {
        id: "2",
        label: "пленка белая",
        text: "ELR 70_Treofan",
        type: "white",
        width: [180, 240, 300, 370, 410],
      }, {
        id: "3",
        label: "пленка белая",
        text: "EPT 60 Treofan",
        type: "white",
        width: [235, 370, 410],
      }, {
        id: "4",
        label: "пленка прозрачная",
        text: "ETH 57 Treofan",
        type: "trans",
        width: [170, 245, 265, 290, 330, 335, 350, 370, 380, 390, 400, 410],
      }, {
        id: "5",
        label: "пленка прозрачная",
        text: "ETR 57 Treofan",
        type: "trans",
        width: [330, 333, 335, 410],
      }, {
        id: "6",
        label: "пленка белая",
        text: "EUH 60 Treofan",
        type: "white",
        width: [230, 250, 290, 300, 306, 330, 335, 350, 355, 370, 375,
          390, 400, 410],
      }, {
        id: "7",
        label: "пленка белая",
        text: "EUH 70 Treofan",
        type: "white",
        width: [230, 240, 290, 300, 330, 333, 335, 340, 365, 370, 390,
          400, 410],
      }, {
        id: "8",
        label: "пленка белая",
        text: "EUP 50 Treofan",
        type: "white",
        width: [275, 335, 370, 400, 410],
      }, {
        id: "9",
        label: "пленка белая",
        text: "EUP 60 Treofan",
        type: "white",
        width: [300, 400],
      }, {
        id: "10",
        label: "пленка белая",
        text: "EWR 57 Treofan",
        type: "white",
        width: [200, 330, 370, 400, 410],
      }, {
        id: "11",
        label: "пленка прозрачная",
        text: "IC 58",
        type: "trans",
        width: [270, 280, 330, 335, 370, 400, 410],
      }, {
        id: "12",
        label: "пленка прозрачная",
        text: "ICS +55",
        type: "trans",
        width: [310, 335, 370, 410],
      }, {
        id: "13",
        label: "пленка белая",
        text: "IW 58",
        type: "white",
        width: [270, 290, 330, 333, 335, 370, 400, 410],
      }, {
        id: "14",
        label: "пленка белая",
        text: "IW 72",
        type: "white",
        width: [110, 260, 410],
      }, {
        id: "15",
        label: "пленка белая",
        text: "LB55 65 мкр",
        type: "white",
        width: [410],
      }, {
        id: "16",
        label: "пленка белая",
        text: "LB55 70 мкр",
        type: "white",
        width: [410],
      }, {
        id: "17",
        label: "пленка белая",
        text: "LB62 55 мкр",
        type: "white",
        width: [410],
      }, {
        id: "18",
        label: "пленка белая",
        text: "LB62 60 мкр",
        type: "white",
        width: [410],
      }, {
        id: "19",
        label: "пленка белая",
        text: "LB70 70 мкр",
        type: "white",
        width: [250, 300, 330, 370, 410],
      }, {
        id: "20",
        label: "пленка белая",
        text: "LIH 70 мкр",
        type: "white",
        width: [435],
      }, {
        id: "21",
        label: "пленка белая",
        text: "LIQ142 60",
        type: "white",
        width: [340, 370, 400, 410],
      }, {
        id: "22",
        label: "пленка белая",
        text: "LIT 50 мкр",
        type: "white",
        width: [335],
      }, {
        id: "23",
        label: "пленка белая",
        text: "LIV142 70 мкр",
        type: "white",
        width: [410],
      }, {
        id: "24",
        label: "пленка белая",
        text: "LIW 50 мкр",
        type: "white",
        width: [270],
      }, {
        id: "25",
        label: "пленка белая",
        text: "PQ-69 Az Pack",
        type: "white",
        width: [260, 300, 330, 410],
      }, {
        id: "26",
        label: "пленка белая",
        text: "TD47",
        type: "white",
        width: [330, 333, 340, 380, 410],
      }, {
        id: "27",
        label: "пленка прозрачная",
        text: "TD53",
        type: "trans",
        width: [330, 390, 410],
      },
    ],
    nonWorkingArea: 16,
    printing: 50000,
    restrict: {
      overlap: false,
      rotation: false,
    },
    trimOffset: 3,
  },
  ilst: {
    applyingDirection: "horizontal",
    areaLayerName: "area",
    areaStrokeColor: [100, 0, 0, 0],
    layoutLayerName: "layout",
    originalLayerName: "original",
    solutionGutter: 10,
  },
};
