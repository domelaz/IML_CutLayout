/**
 * Select2 component types
 */
interface IValueItem {
  id: string;
  text: string;
}

interface ILabeledValueItem extends IValueItem {
  label: string;
}

interface IMaterials extends ILabeledValueItem {
  type: string;
  width: number[];
}
