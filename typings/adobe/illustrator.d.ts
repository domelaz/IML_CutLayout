interface Application {
  /**
   * The active (frontmost) document in Illustrator.
   */
  activeDocument: Document;

  /**
   * If true, a web browser is available.
   *
   * @readonly
   */
  browserAvailable: boolean;

  /**
   * The list of color-settings files currently available for use.
   *
   * @readonly
   */
  colorSettingsList: Object; // @fixme array in reflection;

  /**
   * The default color-settings file for the current application locale.
   *
   * @readonly
   */
  defaultColorSettings: FileInstance;

  /**
   * The documents in the application.
   *
   * @readonly
   */
  documents: Documents;

  /**
   * The list of flattener style names currently available for use.
   *
   * @readonly
   */
  flattenerPresetsList: Object; // @fixme array in reflection;

  /**
   * The amount of unused memory (in bytes) within the Adobe Illustrator partition.
   *
   * @readonly
   */
  freeMemory: number;

  /**
   * The application’s name (not related to the filename of the application file).
   *
   * @readonly
   */
  name: string;

  /**
   * The file path to the application.
   *
   * @readonly
   */
  path: FileInstance;

  /**
   * The list of preset PDF-options names available for use.
   *
   * @readonly
   */
  PDFPresetsList: Object; // @fixme reflection is array

  /**
   * The list of PPD files currently available for use.
   *
   * @readonly
   */
  PPDFileList: Object; // @fixme reflection is array

  /**
   * The preference settings for Illustrator.
   *
   * @readonly
   */
  //preferences: Preferences; // @fixme

  /**
   * The list of preset printing-options names available for use.
   *
   * @readonly
   */
  printPresetsList: Object; // @fixme reflection is array

  /**
   * The list of installed printers.
   *
   * @readonly
   */
  //printerList: Printers; // @fixme no Printers collection

  /**
   * The version of the Scripting plugin.
   *
   * @readonly
   */
  scriptingVersion: string;

  /**
   * All of the currently selected objects in the active (frontmost) document.
   */
  selection: PathItem[]; // @fixme Group objects not respected

  /**
   * The list of presets available for creating a new document.
   *
   * @readonly
   */
  startupPresetsList: Object;

  /**
   * The installed fonts.
   *
   * @readonly
   */
  //textFonts: TextFonts; @fixme no reflection for TextFons collection

  /**
   * The list of preset tracing-options names available for use.
   *
   * @readonly
   */
  tracingPresetsList: string[];

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;

  /**
   * What level of interaction with the user should be allowed when handling
   * script commands.
   */
  userInteractionLevel: UserInteractionLevel;

  /**
   * The version of the Adobe Illustrator application.
   *
   * @readonly
   */
  version: string;

  /**
   * If true, the application is visible.
   *
   * @readonly
   */
  visible: boolean;

  /**
   * Alerts the user.
   */
  beep(): void;

  /**
   * Joins two matrices together.
   *
   * @param {Matrix} matrix
   * @param {Matrix} secondMatrix
   * @returns {Matrix}
   */
  concatenateMatrix(matrix: Matrix, secondMatrix: Matrix): Matrix;

  /**
   * Joins a rotation translation to a transformation matrix.
   *
   * @param {Matrix} matrix
   * @param {number} angle
   * @returns {Matrix}
   */
  concatenateRotationMatrix(matrix: Matrix, angle: number): Matrix;

  /**
   * Concatenates a scale translation to a transformation matrix.
   *
   * @param {Matrix} matrix
   * @param {number} [scaleX]
   * @param {number} [scaleY]
   * @returns {Matrix}
   */
  concatenateScaleMatrix(matrix: Matrix, scaleX?: number, scaleY?: number): Matrix;

  /**
   * Joins a translation to a transformation matrix.
   *
   * @param {Matrix} matrix
   * @param {number} [deltaX]
   * @param {number} [deltaY]
   * @returns {Matrix}
   */
  concatenateTranslationMatrix(matrix, deltaX?: number, deltaY?: number): Matrix;

  /**
   * Copies current selection to the clipboard.
   */
  copy(): void;

  /**
   * Cuts current selection to the clipboard.
   */
  cut(): void;

  /**
   * Returns an identity matrix.
   *
   * @returns {Matrix}
   */
  getIdentityMatrix(): Matrix;

  /**
   * Gets detailed file information for specified PPD file.
   *
   * @param {string} name
   * @returns {any}
   */
  getPPDFileInfo(name: string): string; // @fixme

  /**
   * Returns the full path to the application’s default document profile for the
   * specified preset type.
   *
   * @param {DocumentPresetType} presetType
   * @returns {FileInstance}
   */
  getPresetFileOfType(presetType: DocumentPresetType): FileInstance;

  /**
   * Retrieves the tracing-option settings from the template with a given preset name.
   *
   * @param {string} name
   * @returns {DocumentPreset}
   */
  getPresetSettings(name: string): DocumentPreset;

  /**
   * Returns a transformation matrix containing a single rotation.
   *
   * Note: Requires a value in degrees. For example, 30 rotates the object
   * 30 degrees counterclockwise; -30 rotates the object 30 degrees clockwise.
   *
   * @param {number} angle
   * @returns {Matrix}
   */
  getRotationMatrix(angle?: number): Matrix;

  /**
   * Returns a transformation matrix containing a single scale.
   *
   * Note: Requires a value in percentage. For example, 60 scales the object
   * to 60 % of its original size; 200 doubles the object’s bounds.
   *
   * @param {number} [scaleX]
   * @param {number} [scaleY]
   * @returns {Matrix}
   */
  getScaleMatrix(scaleX?: number, scaleY?: number): Matrix;

  /**
   * Returns a transformation matrix containing a single translation.
   *
   * Note: Requires a value in points. For example, ({100,200} moves the object
   * 100 pt. to the right and 200 pt. up; a minus before each number moves the
   * object left and down.
   *
   * @param {number} [deltaX]
   * @param {number} [deltaY]
   * @returns {Matrix}
   */
  getTranslationMatrix(deltaX?: number, delatY?: number): Matrix;

  /**
   * Checks whether the two matrices are equal.
   *
   * @param {Matrix} matrix
   * @param {Matrix} secondMatrix
   * @returns {boolean}
   */
  isEqualMatrix(matrix: Matrix, secondMatrix: Matrix): boolean;

  /**
   * Checks whether a matrix is singular and cannot be inverted.
   *
   * @param {Matrix} matrix
   * @returns {boolen}
   */
  isSingularMatrix(matrix: Matrix): boolean;

  /**
   * Loads color settings from specified file, or, if file is empty, turns
   * color management off.
   *
   * @param {FileInstance} fileSpec
   */
  loadColorSettings(fileSpec: FileInstance): void;

  /**
   * Opens the file specified by the string with the specified color space and
   * options. If you open a pre-Illustrator 9 document that contains both RGB
   * and CMYK colors and documentColorSpace is supplied, all colors are
   * converted to the specified color space. If the parameter is not supplied,
   * Illustrator opens a dialog so the user can choose the color space.
   *
   * @param {FileInstance} filename
   * @param {DocumentColorSpace} [documentColorSpace],
   * @param {Object} [options]
   *
   */
  open(filename: FileInstance, documentColorSpace?: DocumentColorSpace, options?): Document;

  /**
   * Pastes current clipboard content into the current document.
   */
  paste(): void;

  /**
   * Quits Illustrator. Note that if the clipboard contains data, Illustrator may
   * show a dialog prompting the user to save the data for other applications.
   */
  quit(): void;

  /**
   * Redoes the most recently undone transaction.
   */
  redo(): void;

  /**
   * Forces Illustrator to redraw all its windows.
   */
  redraw(): void;

  /**
   * Gets presets from the file.
   *
   * @param {FileInstance} fileSpec
   * @returns {Object}
   */
  showPresets(fileSpec: FileInstance): Object;

  /**
   * Translates the placeholder text to regular text (a way to enter Unicode
   * points in hex values).
   *
   * @param {string} text
   * @returns {string}
   */
  translatePlaceholderText(text: string): string;

  /**
   * Undoes the most recent transaction.
   */
  undo(): void;
}

declare var app: Application;

/**
 * A collection of Artboard objects.
 *
 * @since 17.0.0 // @fixme Not shure
 */
interface Artboard extends BaseProps<Document> {
  /**
   * Size and position of the artboard.
   */
  artboardRect: number[];

  /**
   * The unique identifying name of the artboard.
   */
  name: string;

  /**
   * Ruler origin of the artboard, relative to the top left corner of the
   * artboard.
   */
  rulerOrigin: number[];

  /**
   * Pixel aspect ratio, used in ruler visualization if the units are pixels.
   * Range: 0.1 to 10.0
   */
  rulerPAR: number;

  /**
   * Show center mark.
   */
  showCenter: boolean;

  /**
   * Show cross hairs.
   */
  showCrossHairs: boolean;

  /**
   * Show title and action safe areas (for video).
   */
  showSafeAreas: boolean;

  /**
   * Deletes this artboard object. You cannot remove the last artboard in a
   * document.
   */
  remove(): void;
}

/**
 * An Artboard object represents a single artboard in a document. There can be between 1 to 100 artboards
 * in one document.
 *
 * @since 17.0.0 // @fixme Not shure
 */
interface Artboards extends Props<Document> {
  /**
   * Creates a new Artboard object.
   *
   * @param
   */
  add(rect: number[]): Artboard;

  /**
   * Retrieves the index position of the active artboard in the document's list.
   * Returns the 0-based index.
   */
  getActiveArtboardIndex(): number;

  /**
   * Gets the first element in the collection with the provided name.
   *
   * @param {string} name
   * @returns {Artboard}
   */
  getByName(name: string): Artboard;

  /**
   * Gets an element from the collection.
   *
   * @param {number} index
   * @returns {Artboard}
   */
  [index: number]: Artboard;

  /**
   * Creates a new Artboard object and inserts it at the given index in the list.
   */
  insert(artboardRect: number[], index: number): void;

  /**
   * Deletes an artboard object. You cannot remove the last artboard in a document.
   */
  remove(index: number): void;

  /**
   * Nothing Makes a specific artboard active and makes it current in the iteration order.
   */
  setActiveArtboardIndex(index: number): void;
}

interface Brushes {
}

/**
 * A collection of CharacterStyle objects.
 */
interface CharacterStyle {}

interface CharacterStyles extends Collection<CharacterStyle>, Props<Document> {}

/**
 * Specifies the properties of a character contained in a text frame.
 * A `CharacterStyle` object associates these attributes with a specific text
 * range through its `characterAttributes` property.
 *
 * NOTE: Character attributes do not have default values, and are `undefined`
 * until explicitly set.
 */
interface CharacterAttributes {}

declare class GradientColor {
  /**
   * The gradient vector angle in degrees. Default: 0.0
   */
  angle: number;

  /**
   * Reference to the object defining the gradient.
   */
  gradient: Gradient;

  /**
   * The gradient highlight vector angle in degrees.
   */
  hiliteAngle: number;

  /**
   * The gradient highlight vector length.
   */
  hiliteLength: number;

  /**
   * The gradient vector length.
   */
  length: number;

  /**
   * An additional transformation matrix to manipulate the gradient path.
   */
  matrix: Matrix;

  /**
   * The gradient vector origin, the center point of the gradient in numbers
   * this color.
   */
  origin: number[];

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;
}

declare class CMYKColor {
  /**
   * The cyan color value. Range 0.0–100.0. Default: 0.0
   */
  cyan: number;

  /**
   * The magenta color value. Range 0.0–100.0. Default: 0.0
   */
  magenta: number;

  /**
   * The yellow color value. Range 0.0–100.0. Default: 0.0
   */
  yellow: number;

  /**
   * The black color value. Range 0.0–100.0. Default: 0.0
   */
  black: number;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;
}

declare class GrayColor {
  /**
   * The tint of the gray. Range: 0.0 to 100.0, where 0.0 is black
   * and 100.0 is white.
   */
  gray: number;

  /**
   * Read-only.
   * The class name of the referenced object.
   */
  typename: string;
}

declare class LabColor {
  /**
   * The a (red-green) color value. Range -128.0–128.0. Default: 0.0
   */
  a: number;

  /**
   * The b (yellow-blue) color value. Range -128.0–128.0. Default: 0.0
   */
  b: number;

  /**
   * The l (lightness) color value. Range -128.0–128.0. Default: 0.0
   */
  l: number;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;
}

declare class NoColor {
  /**
   * The class name of the object
   *
   * @readonly
   */
  typename: string;
}

declare class PatternColor {
  /**
   * Additional transformation arising from manipulating the path.
   */
  matrix: Matrix;

  /**
   * A reference to the pattern object that defines the pattern to use in this
   * color definition.
   */
  pattern: Pattern;

  /**
   * If true, the prototype should be reflected before filling. Default: false
   */
  reflect: boolean;

  /**
   * The axis around which to reflect, in points. Default: 0.0
   */
  reflectAngle: number;

  /**
   * The angle in radians to rotate the prototype pattern before filling.
   * Default: 0.0
   */
  rotation: number;

  /**
   * The fraction to which to scale the prototype pattern before filling,
   * represented as a point containing horizontal and vertical scaling
   * percentages.
   */
  scaleFactor: number[];

  /**
   * The angle in radians by which to slant the shear. Default: 0.0
   */
  shearAngle: number;

  /**
   * The axis to shear with respect to, in points. Default: 0.0
   */
  shearAxis: number;

  /**
   * The angle in radians to which to translate the unscaled prototype pattern
   * before filling. Default: 0.0
   */
  shiftAngle: number

  /**
   * The distance in points to which to translate the unscaled prototype pattern
   * before filling. Default: 0.0
   */
  shiftDistance: number;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;
}

declare class RGBColor {
  /**
   * The blue color value. Range: 0.0 to 255.0
   */
  blue: number;

  /**
   * The green color value. Range: 0.0 to 255.0
   */
  green: number;

  /**
   * The red color value. Range: 0.0 to 255.0
   */
  red: number;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;
}

declare class SpotColor {
  /**
   * A reference to the spot color object that defines the color.
   */
  spot: Spot;

  /**
   * The tint of the color. Range: 0.0 to 100.0
   */
  tint: number;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string
}

declare type Color = CMYKColor | GrayColor | LabColor | NoColor | PatternColor | RGBColor | SpotColor;

/**
 * This type not enforce max length of array, e.g.
 * [0]: Point // Error
 * [1, 1]: Point // Ok
 * [1, 2, 3]: Point // Ok too :(
 *
 * @version 1.8.10
 */
declare type Point = [number, number];

interface BaseProps<P> {
  /**
   * The parent of this object.
   *
   * @readonly
   */
  parent: P;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;
}

interface Props<P> extends BaseProps<P> {
  /**
   * The number of objects in the collection.
   *
   * @readonly
   */
  length: number;
}

interface CollectionIterable<T> {
  /**
   * Gets an element from the collection.
   *
   * @param {number} index
   * @returns {Document}
   */
  [index: number]: T;
}

/**
 * Generic collections
 */
interface Collection<T> extends CollectionIterable<T> {
  /**
   * Creates a new object.
   */
  add(): T;

  /**
   * Gets the first element in the collection with the provided name.
   *
   * @param {string} name
   * @returns {Object}
   */
  getByName(name: string): T;

  /**
   * Deletes all elements in this collection.
   */
  removeAll(): void;
}

interface GraphicStyles extends Collection<GraphicStyle> {} // @fixme no `add` here

interface GraphicStyle {
  name: string;
  parent: Document;
  typename: string;
  applyTo(artItem: PlacedItem): void;
  mergeTo(artItem: PathItem): void;
  remove();
}

declare class PDFSaveOptions {
  new(): PDFSaveOptions;
  acrobatLayers: boolean;
}


interface CompoundPathItem {
}

interface CompoundPathItems {
}

/**
 * A set of data used for dynamic publishing. A dataset allows you to collect
 * a number of variables and their dynamic data into one object. You must have
 * at least one variable bound to an art item in order to create a dataset.
 *
 * See the class Variable.
 */
interface DataSet extends BaseProps<Document> {
  /**
   * Then name of the dataset.
   */
  name: string;

  /**
   * Displays the dataset.
   */
  display(): void;

  /**
   * Deletes this object.
   */
  remove(): void;

  /**
   * Updates the dataset.
   */
  update(): void;
}

interface Datasets extends Props<Document>, Collection<DataSet> { }

interface Document {
  /**
   * The currently opened dataset.
   */
  activeDataset: DataSet;

  /**
   * The active layer in the document.
   */
  activeLayer: Layer;

  /**
   * The document’s current view.
   *
   * @readonly
   */
  activeView: View;

  /**
   * All artboards in the document.
   *
   * @readonly
   */
  artboards: Artboards;

  /**
   * The brushes contained in the document.
   *
   * @readonly
   */
  brushes: Brushes;

  /**
   * The list of character styles in this document.
   *
   * @readonly
   */
  characterStyles: CharacterStyles;

  /**
   * The compound path items contained in the document.
   *
   * @readonly
   */
  compoundPathItems: CompoundPathItems;

  /**
   * The boundary of the document’s cropping box for output, or `null` if no
   * value has been set.
   */
  cropBox: number[];

  /**
   * The style of the document’s cropping box.
   */
  cropStyle: CropOptions;

  /**
   * The datasets contained in the document.
   *
   * @readonly
   */
  dataSets: Datasets;

  /**
   * The color to use to fill new paths if defaultFilled is true.
   */
  defaultFillColor: Color;

  /**
   * If true, a new path should be filled.
   */
  defaultFilled: boolean;

  /**
   * If true, the art beneath a filled object should be overprinted by default.
   */
  defaultFillOverprint: boolean;

  /**
   * Default type of line capping for paths created.
   */
  defaultStrokeCap: StrokeCap;

  /**
   * The stroke color for new paths if default stroked is true.
   */
  defaultStrokeColor: Color;

  /**
   * If true, a new path should be stroked.
   */
  defaultStroked: boolean;

  /**
   * Default lengths for dashes and gaps in dashed lines, starting with the
   * first dash length, followed by the first gap length, and so on. Set to
   * an empty object, {}, for solid line.
   */
  defaultStrokeDashes: Object; // @fixme

  /**
   * The default distance into the dash pattern at which the pattern should
   * be started for new paths.
   */
  defaultStrokeDashOffset: number;

  /**
   * Default type of joints in new paths.
   */
  defaultStrokeJoin: StrokeJoin;

  /**
   * When a default stroke join is set to mitered, this property specifies
   * when the join will be converted to beveled (squared-off) by default.
   * The default miter limit of 4 means that when the length of the point
   * reaches four times the stroke weight, the join switches from a miter
   * join to a bevel join. Range: 1 to 500; a value of 1 specifies a bevel join.
   */
  defaultStrokeMiterLimit: number;

  /**
   * If true, the art beneath a stroked object should be overprinted by default.
   */
  defaultStrokeOverprint: boolean;

  /**
   * Default width of stroke for new paths.
   */
  defaultStrokeWidth: number;

  /**
   * The color specification system to use for this document’s color space.
   *
   * @readonly
   */
  documentColorSpace: DocumentColorSpace;

  /**
   * The file associated with the document, which includes the complete path to
   * the file.
   *
   * @readonly
   */
  fullName: FileInstance;

  /**
   * The bounds of the illustration excluding the stroke width of any objects
   * in the document.
   *
   * @readonly
   */
  geometricBounds: number[];

  /**
   * The gradients contained in the collection object document.
   *
   * @readonly
   */
  gradients: Gradients;

  /**
   * The graphic styles defined in this collection object document.
   *
   * @readonly
   */
  graphicStyles: GraphicStyles;

  /**
   * The graph art items in this collection object document.
   *
   * @readonly
   */
  graphItems: GraphItems;

  /**
   * The group items contained in the collection object document.
   *
   * @readonly
   */
  groupItems: GroupItems;

  /**
   * The height of the document.
   *
   * @readonly
   */
  height: number;

  /**
   * The list of inks in this document.
   *
   * @readonly
   */
  inkList: Object;

  /**
   * The Kinsoku set of characters that cannot begin or end a line of Japanese
   * text.
   *
   * @readonly
   */
  kinsokuSet: Object;

  /**
   * The layers contained in the object document.
   *
   * @readonly
   */
  layers: Layers;

  /**
   * The legacy text items in the collection object document.
   *
   * @readonly
   */
  legacyTextItems: LegacyTextItems;

  /**
   * The mesh art items contained in the collection object document.
   *
   * @readonly
   */
  meshItems: MeshItems;

  /**
   * A list of names of predefined Mojikumi sets which specify the spacing for
   * the layout and composition of Japanese text.
   *
   * @readonly
   */
  mojikumiSet: Object;

  /**
   * The document’s name (not the complete file path to the document).
   *
   * @readonly
   */
  name: string;

  /**
   * The current output resolution for the document in dots per inch (dpi).
   *
   * @readonly
   */
  outputResolution: number;

  /**
   * The page items (all art item classes) collection object contained
   * in the document.
   *
   * @readonly
   */
  pageItems: PageItems;

  /**
   * The zero-point of the page in the document without margins, relative to
   * the overall height and width.
   */
  pageOrigin: number[];

  /**
   * The list of paragraph styles in this collection object document.
   *
   * @readonly
   */
  paragraphStyles: ParagraphStyles;

  /**
   * The application that contains this document.
   *
   * @readonly
   */
  parent: Application;

  /**
   * The file associated with the document, which includes the complete path
   * to the file.
   *
   * @readonly
   */
  path: FileInstance;

  /**
   * The path items contained in this collection object document.
   *
   * @readonly
   */
  pathItems: PathItems;

  /**
   * The patterns contained in this object document.
   *
   * @readonly
   */
  patterns: Patterns;

  /**
   * The placed items contained in this collection object document.
   *
   * @readonly
   */
  placedItems: PlacedItems;

  /**
   * The plugin items contained in this collection object document.
   *
   * @readonly
   */
  pluginItems: PluginItems;

  /**
   * If true, this document should be printed as tiled output.
   *
   * @readonly
   */
  printTiles: boolean;

  /**
   * The raster items contained in this collection object document.
   *
   * @readonly
   */
  rasterItems: RasterItems;

  /**
   * The zero-point of the rulers in the document relative to the bottom left
   * of the document.
   */
  rulerOrigin: number[];

  /**
   * The default measurement units for the rulers in the document.
   *
   * @readonly
   */
  rulerUnits: RulerUnits;

  /**
   * If true, the document has not been changed since last time it was saved.
   */
  saved: boolean;

  /**
   * References to the objects in this document’s current selection, or null
   * when nothing is selected. A reference to an insertion point is returned
   * when there is an active insertion point in the contents of a selected
   * text art item. Similarly, a reference to a range of text is returned when
   * characters are selected in the contents of a text art item.
   */
  selection: PathItem[]; // @fixme

  /**
   * If true, placed images should be displayed in the document.
   *
   * @readonly
   */
  showPlacedImages: boolean;

  /**
   * If true, long paths should be split when printing.
   *
   * @readonly
   */
  splitLongPaths: boolean;

  /**
   * The spot colors contained in this object document.
   *
   * @readonly
   */
  spots: Spots;

  /**
   * If true, the file is a stationery file.
   *
   * @readonly
   */
  stationery: boolean;

  /**
   * The story items in this document.
   *
   * @readonly
   */
  stories: Stories;

  /**
   * The swatches contained in this object document.
   *
   * @readonly
   */
  swatches: Swatches;

  /**
   * The art items in the document collection object linked to symbols.
   *
   * @readonly
   */
  symbolItems: SymbolItems;

  /**
   * The symbols contained in this object document.
   *
   * @readonly
   */
  symbols: Symbols;

  /**
   * The tags contained in this object document.
   *
   * @readonly
   */
  tags: Tags;

  /**
   * The text frames contained in this collection object document.
   *
   * @readonly
   */
  textFrames: TextFrames;

  /**
   * If true, full pages should be tiled when printing this document.
   *
   * @readonly
   */
  tileFullPages: boolean;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;

  /**
   * If true, the printer’s default screen should be used when printing
   * this document.
   *
   * @readonly
   */
  useDefaultScreen: boolean;

  /**
   * The variables defined in this collection object document.
   *
   * @readonly
   */
  variables: Variables;

  /**
   * If true, the variables are locked.
   */
  variablesLocked: boolean;

  /**
   * The views contained in this object document.
   *
   * @readonly
   */
  views: Views;

  /**
   * The visible bounds of the document, including stroke width of any objects
   * in the illustration.
   *
   * @readonly
   */
  visibleBounds: number[];

  /**
   * The width of this document.
   *
   * @readonly
   */
  width: number;

  /**
   * The XMP metadata packet associated with this document.
   */
  XMPString: string;

  /**
   * Brings the first window associated with the document to the front.
   */
  activate(): void;

  /**
   * Closes a document using specified save options. When you close a document,
   * you should set your document reference to null to prevent your script from
   * accidentally trying to access closed documents.
   *
   * @param {SaveOptions} [options]
   */
  close(options?: SaveOptions): void;

  /**
   * Exports the document to the specified file using one of the predefined
   * export file formats. The appropriate file extension is automatically
   * appended to the file name, except for Photoshop® documents. For these,
   * you must include the file extension (PSD) in the file specification.
   *
   * @param {FileInstance} exportFile
   * @param {ExportType} exportFormat
   * @param {ExportOptions} [options]
   */
  exportFile(exportFile: FileInstance, exportFormat: ExportType, options?: ExportOptions): void;

  /**
   * Exports the current PDF preset values to the file.
   *
   * @param {FileInstance} file
   */
  exportPDFPreset(file: FileInstance): void;

  /**
   * Exports the current print preset values to the file.
   *
   * @param {FileInstance} file
   */
  exportPrintPreset(file: FileInstance): void;

  /**
   * Saves datasets into an XML library. The datasets contain variables and
   * their associated dynamic data.
   *
   * @param {FileInstance} file
   */
  exportVariables(file: FileInstance): void;

  /**
   * Captures the artwork content within the clipping boundaries in this
   * document as a raster image, and writes the image data to a specified file.
   * If the bounds parameter is omitted, captures the entire artwork.
   *
   * @param {FileInstance} imageFile
   * @param {Array} [clipBounds]
   * @param {ImageCaptureOptions} [options]
   */
  imageCapture(imageFile: FileInstance, clipBounds?: number[], options?: ImageCaptureOptions): void;

  /**
   * Loads the character styles from the Illustrator file.
   *
   * @param {FileInstance} file
   */
  importCharacterStyles(file: FileInstance): void;

  /**
   * Loads the paragraph styles from the Illustrator file.
   *
   * @param {FileInstance} file
   */
  importParagraphStyles(file: FileInstance): void;

  /**
   * Loads all PDF presets from a file.
   *
   * @param {FileInstance} file
   * @param {boolean} [replacingPreset]
   */
  importPDFPreset(file: FileInstance, replacingPreset?: boolean): void;

  /**
   * Loads the named print preset from the file.
   *
   * @param {string} printPreset
   * @param {FileInstance} file
   */
  importPrintPreset(printPreset: string, file: FileInstance): void;

  /**
   * Imports a library containing datasets, variables, and their associated
   * dynamic data. Importing variables overwrites existing variables and
   * datasets.
   *
   * @param {FileInstance} file
   */
  importVariables(file: FileInstance): void;

  /**
   * Prints the document.
   *
   * @param {PrintOptions} [options]
   */
  print(options?: PrintOptions): void;

  /**
   * Rearranges artboards in the document. All arguments are optional.
   * Default layout style is `DocumentArtboardLayout.GridByRow`.
   *
   * The second argument specifies the number of rows or columns, as appropriate
   * for the chosen layout style, in the range `[1..docNumArtboards-1]`, or 1
   * (the default) for single row/column layouts.
   *
   * Spacing is a number of pixels, default 20.
   *
   * When last argument is `true` (the default), artwork is moved with the artboards.
   *
   * @param {DocumentArtboardLayout} [artboardLayout]
   * @param {number} [artboardRowsOrCols]
   * @param {number} [artboardSpacing]
   * @param {boolean} [artboardMoveArtwork]
   * @returns {boolean}
   */
  rearrangeArtboards(artboardLayout?: DocumentArtboardLayout, artboardRowsOrCols?: number, artboardSpacing?: number, artboardMoveArtwork?: boolean): boolean;

  /**
   * Saves the document in it current location.
   */
  save(): void;

  /**
   * Saves the document in the specified file as an Illustrator, EPS,
   * or PDF file.
   *
   * @param {FileInstance} saveIn
   * @param {SaveOptions} options
   */
  saveAs(saveIn: FileInstance, options?: SaveOptions): void;
}

interface Documents extends Props<Application>, CollectionIterable<Document> {
  /**
   * Creates a new document using optional parameters and returns a reference
   * to the new document.
   *
   * @example
   * // Creates a new document with an RGB color space
   * app.documents.add( DocumentColorSpace.RGB );
   *
   * @param {DocumentColorSpace} [colorSpace]
   * @param {number} [width]
   * @param {number} [height]
   * @returns {Document}
   */
  add(colorSpace?: DocumentColorSpace, width?: number, height?: number): Document;

  /**
   * Creates a new document using optional parameters and returns a reference
   * to the new document.
   *
   * @param {string} startupPreset
   * @param {DocumentPreset} presetSettings
   * @returns {Document}
   */
  addDocument(startupPreset: string, presetSettings: DocumentPreset): Document;

  /**
   * Gets the first element in the collection with the specified name.
   *
   * @param {string} name
   * @returns {Document}
   */
  getByName(name: string): Document;
}

interface DocumentPreset {
  /**
   * The color space for the new document.
   *
   * @param {DocumentColorSpace} colorMode
   */
  colorMode: DocumentColorSpace;

  /**
   * The height in document points. Default: 792.0
   *
   * @param {number} height
   */
  height: number;

  /**
   * The preview mode for the new document.
   *
   * @param {DocumentPreviewMode} previewMode
   */
  previewMode: DocumentPreviewMode;

  /**
   * The raster resolution for the new document.
   *
   * @param {DocumentRasterResolution} rasterResolution
   */
  rasterResolution: DocumentRasterResolution;

  /**
   * The document title.
   *
   * @param {string} title
   */
  title: string;

  /**
   * The transparency grid color for the new document.
   *
   * @param {DocumentTransparencyGrid} transparencyGrid
   */
  transparencyGrid: DocumentTransparencyGrid;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename?: string;

  /**
   * The ruler units for the new document.
   *
   * @param {RulerUnits} units
   */
  units: RulerUnits;

  /**
   * The width in document points. Default: 612.0
   *
   * @param {number} width
   */
  width: number;
}

interface DocumentPresetConstructor {
  new(): DocumentPreset;
}

declare var DocumentPreset: DocumentPresetConstructor;

declare enum AlternateGlyphsForm {
  DEFAULTFORM,
  EXPERT,
  FULLWIDTH,
  HALFWIDTH,
  JIS78FORM,
  JIS83FORM,
  PROPORTIONALWIDTH,
  QUARTERWIDTH,
  THIRDWIDTH,
  TRADITIONAL
}

/**
 * How the art should be clipped during output.
 *
 * OUTPUTARTBOUNDS = Output size is the size of the artwork.
 * OUTPUTARTBOARDBOUNDS = Output size is the size of the artboard.
 * OUTPUTCROPRECTBOUNDS = Output size is the size of the crop area.
 */
declare enum ArtClippingOption {
  OUTPUTARTBOUNDS,
  OUTPUTARTBOARDBOUNDS,
  OUTPUTCROPRECTBOUNDS
}

declare enum AutoCADColors {
  Max8Colors,
  Max16Colors,
  Max256Colors,
  TrueColors
}

declare enum AutoCADCompatibility {
  AutoCADRelease13,
  AutoCADRelease14,
  AutoCADRelease15,
  AutoCADRelease18
}

declare enum AutoCADExportFileFormat {
  DXF,
  DWG
}

declare enum AutoCADExportOption {
  PreserveAppearance,
  MaximumEditability
}

declare enum AutoCADGlobalScaleOption {
  OriginalSize,
  FitArtboard,
  ScaleByValue
}

declare enum AutoCADRasterFormat {
  PNG,
  JPEG
}

declare enum AutoCADUnit {
  Points,
  Picas,
  Inches,
  Millimeters,
  Centimeters,
  Pixels
}

declare enum AutoKernType {
  AUTO,
  NOAUTOKERN,
  OPTICAL
}

declare enum AutoLeadingType {
  BOTTOMTOBOTTOM,
  TOPTOTOP
}

declare enum BaselineDirectionType {
  Standard,
  TateChuYoko,
  VerticalRotated
}

declare enum BlendAnimationType {
  INBUILD,
  INSEQUENCE,
  NOBLENDANIMATION
}

/**
 * The blend mode used when compositing an object.
 */
declare enum BlendModes {
  COLORBLEND,
  COLORBURN,
  COLORDODGE,
  DARKEN,
  DIFFERENCE,
  EXCLUSION,
  HARDLIGHT,
  HUE,
  LIGHTEN,
  LUMINOSITY,
  MULTIPLY,
  NORMAL,
  OVERLAY,
  SATURATIONBLEND,
  SCREEN,
  SOFTLIGHT
}

declare enum BurasagariTypeEnum {
  Forced,
  None,
  Standard
}

declare enum CaseChangeType {
  LOWERCASE,
  SENTENCECASE,
  TITLECASE,
  UPPERCASE
}

declare enum ColorConversion {
  COLORCONVERSIONREPURPOSE,
  COLORCONVERSIONTODEST,
  None
}

declare enum ColorDestination {
  COLORDESTINATIONDOCCMYK,
  COLORDESTINATIONDOCRGB,
  COLORDESTINATIONPROFILE,
  COLORDESTINATIONWORKINGCMYK,
  COLORDESTINATIONWORKINGRGB,
  None
}

/**
 * The method used to dither colors in exported GIF and PNG8 images.
 */
declare enum ColorDitherMethod {
  DIFFUSION,
  NOISE,
  NOREDUCTION,
  PATTERNDITHER
}

declare enum ColorModel {
  PROCESS,
  REGISTRATION,
  SPOT
}

declare enum ColorProfile {
  INCLUDEALLPROFILE,
  INCLUDEDESTPROFILE,
  INCLUDERGBPROFILE,
  LEAVEPROFILEUNCHANGED,
  None
}

/**
 * The method used to reduce the number of colors in exported GIF and
 * PNG8 images.
 */
declare enum ColorReductionMethod {
  ADAPTIVE,
  PERCEPTUAL,
  SELECTIVE,
  WEB
}

/**
 * The color specification for an individual color.
 */
declare enum ColorType {
  CMYK,
  GRADIENT,
  GRAY,
  NONE,
  PATTERN,
  RGB,
  SPOT
}

/**
 * The version of the Illustrator file to create when saving an EPS or
 * Illustrator file
 */
declare enum Compatibility {
  ILLUSTRATOR10,
  ILLUSTRATOR11,
  ILLUSTRATOR12,
  ILLUSTRATOR13,
  ILLUSTRATOR8,
  ILLUSTRATOR9,
  JAPANESEVERSION3
}

/**
 * The quality of bitmap compression used when saving a PDF file
 */
declare enum CompressionQuality {
  AUTOMATICJPEG2000HIGH,
  AUTOMATICJPEG2000LOSSLESS,
  AUTOMATICJPEG2000LOW,
  AUTOMATICJPEG2000MAXIMUM,
  AUTOMATICJPEG2000MEDIUM,
  AUTOMATICJPEG2000MINIMUM,
  AUTOMATICJPEGHIGH,
  AUTOMATICJPEGLOW,
  AUTOMATICJPEGMAXIMUM,
  AUTOMATICJPEGMEDIUM,
  AUTOMATICJPEGMINIMUM,
  JPEG2000HIGH,
  JPEG2000LOSSLESS,
  JPEG2000LOW,
  JPEG2000MAXIMUM,
  JPEG2000MEDIUM,
  JPEG2000MINIMUM,
  JPEGHIGH,
  JPEGLOW,
  JPEGMAXIMUM,
  JPEGMEDIUM,
  JPEGMINIMUM,
  None,
  ZIP4BIT,
  ZIP8BIT
}

/**
 * The style of a document’s cropping box
 */
declare enum CropOptions {
  Japanese,
  Standard
}

/**
 * The layout of in the new document.
 */
declare enum DocumentArtboardLayout {
  Column,
  GridByCol,
  GridByRow,
  RLGridByCol,
  RLGridByRow,
  RLRow,
  Row
}

/**
 * The color space of a document
 */
declare enum DocumentColorSpace {
  CMYK,
  RGB
}

/**
 * The preset types available for new documents.
 */
declare enum DocumentPresetType {
  BasicCMYK,
  BasicRGB,
  Mobile,
  Print,
  Video,
  Web
}

/**
 * The document preview mode
 */
declare enum DocumentPreviewMode {
  DefaultPreview,
  OverprintPreview,
  PixelPreview
}

/**
 * The preset document raster resolution
 */
declare enum DocumentRasterResolution {
  HighResolution,
  MediumResolution,
  ScreenResolution
}

/**
 * Document transparency grid colors
 */
declare enum DocumentTransparencyGrid {
  TransparencyGridBlue,
  TransparencyGridDark,
  TransparencyGridGreen,
  TransparencyGridLight,
  TransparencyGridMedium,
  TransparencyGridNone,
  TransparencyGridOrange,
  TransparencyGridPurple,
  TransparencyGridRed
}

/**
 * The file format used to save a file
 */
declare enum DocumentType {
  EPS,
  ILLUSTRATOR,
  PDF
}

declare enum DownsampleMethod {
  AVERAGEDOWNSAMPLE,
  BICUBICDOWNSAMPLE,
  NODOWNSAMPLE,
  SUBSAMPLE
}

declare enum EPSPostScriptLevelEnum {
  LEVEL2,
  LEVEL3
}

/**
 * The preview image format used when saving an EPS file
 */
declare enum EPSPreview {
  BWMACINTOSH,
  BWTIFF,
  COLORMACINTOSH,
  COLORTIFF,
  None,
  TRANSPARENTCOLORTIFF
}

declare enum ElementPlacement {
  INSIDE,
  PLACEAFTER,
  PLACEATBEGINNING,
  PLACEATEND,
  PLACEBEFORE
}

/**
 * The file format used to export a file
 */
declare enum ExportType {
  AutoCAD,
  FLASH,
  GIF,
  JPEG,
  PHOTOSHOP,
  PNG24,
  PNG8,
  SVG
}

declare enum FigureStyleType {
  DEFAULTFIGURESTYLE,
  PROPORTIONAL,
  PROPORTIONALOLDSTYLE,
  TABULAR,
  TABULAROLDSTYLE
}

/**
 * The method used to convert Illustrator images when exporting files
 */
declare enum FlashExportStyle {
  ASFLASHFILE,
  LAYERSASFILES,
  LAYERSASFRAMES,
  LAYERSASSYMBOLS
}

/**
 * Version for exported SWF file
 */
declare enum FlashExportVersion {
  FlashVersion1,
  FlashVersion2,
  FlashVersion3,
  FlashVersion4,
  FlashVersion5,
  FlashVersion6,
  FlashVersion7,
  FlashVersion8,
  FlashVersion9
}

/**
 * The format used to store flash images
 */
declare enum FlashImageFormat {
  LOSSLESS,
  LOSSY
}

/**
 * The method used to store JPEG images
 */
declare enum FlashJPEGMethod {
  Optimized,
  Standard
}

declare enum FlashPlaybackSecurity {
  PlaybackLocal,
  PlaybackNetwork
}

declare enum FontBaselineOption {
  NORMALBASELINE,
  SUBSCRIPT,
  SUPERSCRIPT
}

declare enum FontCapsOption {
  ALLCAPS,
  ALLSMALLCAPS,
  NORMALCAPS,
  SMALLCAPS
}

declare enum FontOpenTypePositionOption {
  DENOMINATOR,
  NUMERATOR,
  OPENTYPEDEFAULT,
  OPENTYPESUBSCRIPT,
  OPENTYPESUPERSCRIPT
}

declare enum FontSubstitutionPolicy {
  SUBSTITUTEDEVICE,
  SUBSTITUTEOBLIQUE,
  SUBSTITUTETINT
}

/**
 * The type of gradient
 */
declare enum GradientType {
  LINEAR,
  RADIAL
}

/**
 * The color space of a raster item or an exported Photoshop 5 file
 */
declare enum ImageColorSpace {
  CMYK,
  DeviceN,
  Grayscale,
  Indexed,
  LAB,
  RGB,
  Separation
}

declare enum InkPrintStatus {
  CONVERTINK,
  DISABLEINK,
  ENABLEINK
}

declare enum InkType {
  BLACKINK,
  CUSTOMINK,
  CYANINK,
  MAGENTAINK,
  YELLOWINK
}

declare enum JavaScriptExecutionMode {
  BeforeRunning,
  OnRuntimeError,
  never
}

/**
 * The alignment or justification for a paragraph of text
 */
declare enum Justification {
  CENTER,
  FULLJUSTIFY,
  FULLJUSTIFYLASTLINECENTER,
  FULLJUSTIFYLASTLINELEFT,
  FULLJUSTIFYLASTLINERIGHT,
  LEFT,
  RIGHT
}

declare enum KinsokuOrderEnum {
  PUSHIN,
  PUSHOUTFIRST,
  PUSHOUTONLY
}

/**
 * The type of knockout to use on a page item
 */
declare enum KnockoutState {
  DISABLED,
  ENABLED,
  INHERITED,
  Unknown
}

declare enum LanguageType {
  BOKMALNORWEGIAN,
  BRAZILLIANPORTUGUESE,
  BULGARIAN,
  CANADIANFRENCH,
  CATALAN,
  CHINESE,
  CZECH,
  DANISH,
  DUTCH,
  DUTCH2005REFORM,
  ENGLISH,
  FINNISH,
  GERMAN2006REFORM,
  GREEK,
  HUNGARIAN,
  ICELANDIC,
  ITALIAN,
  JAPANESE,
  NYNORSKNORWEGIAN,
  OLDGERMAN,
  POLISH,
  RUMANIAN,
  RUSSIAN,
  SERBIAN,
  SPANISH,
  STANDARDFRENCH,
  STANDARDGERMAN,
  STANDARDPORTUGUESE,
  SWEDISH,
  SWISSGERMAN,
  SWISSGERMAN2006REFORM,
  TURKISH,
  UKENGLISH,
  UKRANIAN
}

declare enum LayerOrderType {
  BOTTOMUP,
  TOPDOWN
}

/**
 * Illustrator library type
 */
declare enum LibraryType {
  Brushes,
  GraphicStyles,
  IllustratorArtwork,
  Swatches,
  Symbols
}

/**
 * The type of compression to use on a monochrome bitmap item when
 * saving a PDF file
 */
declare enum MonochromeCompression {
  CCIT3,
  CCIT4,
  MONOZIP,
  None,
  RUNLENGTH
}

/**
 * How transparency should be flattened when saving EPS and Illustrator
 * file formats with compatibility set to versions of Illustrator
 * earlier than Illustrator10
 */
declare enum OutputFlattening {
  PRESERVEAPPEARANCE,
  PRESERVEPATHS
}

declare enum PDFBoxType {
  PDFARTBOX,
  PDFBLEEDBOX,
  PDFBOUNDINGBOX,
  PDFCROPBOX,
  PDFMEDIABOX,
  PDFTRIMBOX
}

declare enum PDFChangesAllowedEnum {
  CHANGE128ANYCHANGES,
  CHANGE128COMMENTING,
  CHANGE128EDITPAGE,
  CHANGE128FILLFORM,
  CHANGE128NONE,
  CHANGE40ANYCHANGES,
  CHANGE40COMMENTING,
  CHANGE40NONE,
  CHANGE40PAGELAYOUT
}

/**
 * The version of the Acrobat file format to create when saving a PDF
 * file
 */
declare enum PDFCompatibility {
  ACROBAT4,
  ACROBAT5,
  ACROBAT6,
  ACROBAT7,
  ACROBAT8
}

declare enum PDFOverprint {
  DISCARDPDFOVERPRINT,
  PRESERVEPDFOVERPRINT
}

declare enum PDFPrintAllowedEnum {
  PRINT128HIGHRESOLUTION,
  PRINT128LOWRESOLUTION,
  PRINT128NONE,
  PRINT40HIGHRESOLUTION,
  PRINT40NONE
}

declare enum PDFTrimMarkWeight {
  TRIMMARKWEIGHT0125,
  TRIMMARKWEIGHT025,
  TRIMMARKWEIGHT05
}

declare enum PDFXStandard {
  PDFX1A2001,
  PDFX1A2003,
  PDFX32001,
  PDFX32003,
  PDFXNONE
}

declare enum PageMarksTypes {
  Japanese,
  Roman
}

/**
 * Which points, if any, of a path are selected
 */
declare enum PathPointSelection {
  ANCHORPOINT,
  LEFTDIRECTION,
  LEFTRIGHTPOINT,
  NOSELECTION,
  RIGHTDIRECTION
}

declare enum PerspectiveGridType {
  OnePointPerspectiveGridType,
  TwoPointPerspectiveGridType,
  ThreePointPerspectiveGridType,
  InvalidPerspectiveGridType
}

declare enum PerspectiveGridPlaneType {
  GRIDLEFTPLANETYPE,
  GRIDRIGHTPLANETYPE,
  GRIDFLOORPLANETYPE,
  INVALIDGRIDPLANETYPE
}

declare enum PhotoshopCompatibility {
  PHOTOSHOP6,
  PHOTOSHOP8
}

/**
 * The type of path point selected
 */
declare enum PointType {
  CORNER,
  SMOOTH
}

declare enum PolarityValues {
  NEGATIVE,
  POSITIVE
}

declare enum PostScriptImageCompressionType {
  IMAGECOMPRESSIONNONE,
  JPEG,
  RLE
}

declare enum PrintArtworkDesignation {
  ALLLAYERS,
  VISIBLELAYERS,
  VISIBLEPRINTABLELAYERS
}

declare enum PrintColorIntent {
  ABSOLUTECOLORIMETRIC,
  PERCEPTUALINTENT,
  RELATIVECOLORIMETRIC,
  SATURATIONINTENT
}

declare enum PrintColorProfile {
  CUSTOMPROFILE,
  OLDSTYLEPROFILE,
  PRINTERPROFILE,
  SOURCEPROFILE
}

declare enum PrintColorSeparationMode {
  COMPOSITE,
  HOSTBASEDSEPARATION,
  INRIPSEPARATION
}

declare enum PrintFontDownloadMode {
  DOWNLOADCOMPLETE,
  DOWNLOADNONE,
  DOWNLOADSUBSET
}

declare enum PrintOrientation {
  LANDSCAPE,
  PORTRAIT,
  REVERSELANDSCAPE,
  REVERSEPORTRAIT
}

declare enum PrintPosition {
  TRANSLATEBOTTOM,
  TRANSLATEBOTTOMLEFT,
  TRANSLATEBOTTOMRIGHT,
  TRANSLATECENTER,
  TRANSLATELEFT,
  TRANSLATERIGHT,
  TRANSLATETOP,
  TRANSLATETOPLEFT,
  TRANSLATETOPRIGHT
}

declare enum PrintTiling {
  TILEFULLPAGES,
  TILEIMAGEABLEAREAS,
  TILESINGLEFULLPAGE
}

declare enum PrinterColorMode {
  BLACKANDWHITEPRINTER,
  COLORPRINTER,
  GRAYSCALEPRINTER
}

declare enum PrinterPostScriptLevelEnum {
  PSLEVEL1,
  PSLEVEL2,
  PSLEVEL3
}

declare enum PrinterTypeEnum {
  NONPOSTSCRIPTPRINTER,
  POSTSCRIPTPRINTER,
  Unknown
}

declare enum PrintingBounds {
  ARTBOARDBOUNDS,
  ARTWORKBOUNDS,
  CROPBOUNDS
}

/**
 * The status of a raster item’s linked image if the image is stored
 * externally
 */
declare enum RasterLinkState {
  DATAFROMFILE,
  DATAMODIFIED,
  NODATA
}

/**
 * The default measurement units for the rulers of a document
 */
declare enum RulerUnits {
  Centimeters,
  Inches,
  Millimeters,
  Picas,
  Pixels,
  Points,
  Qs,
  Unknown
}

/**
 * How should the CSS properties of the document be included in an
 * exported SVG file
 */
declare enum SVGCSSPropertyLocation {
  ENTITIES,
  PRESENTATIONATTRIBUTES,
  STYLEATTRIBUTES,
  STYLEELEMENTS
}

/**
 * SVG version compatibility for exported files
 */
declare enum SVGDTDVersion {
  SVG1_0,
  SVG1_1,
  SVGBASIC1_1,
  SVGTINY1_1,
  SVGTINY1_1PLUS,
  SVGTINY1_2
}

/**
 * How should the text in the document be encoded when exporting an SVG
 * file
 */
declare enum SVGDocumentEncoding {
  ASCII,
  UTF16,
  UTF8
}

/**
 * What font glyphs should be included in exported SVG files
 */
declare enum SVGFontSubsetting {
  ALLGLYPHS,
  COMMONENGLISH,
  COMMONROMAN,
  GLYPHSUSED,
  GLYPHSUSEDPLUSENGLISH,
  GLYPHSUSEDPLUSROMAN,
  None
}

/**
 * Types for fonts included in exported SVG files
 */
declare enum SVGFontType {
  CEFFONT,
  OUTLINEFONT,
  SVGFONT
}

/**
 * Save options provided when closing a document
 */
declare enum SaveOptions {
  DONOTSAVECHANGES,
  PROMPTTOSAVECHANGES,
  SAVECHANGES
}

/**
 * The mode of display for a view
 */
declare enum ScreenMode {
  DESKTOP,
  FULLSCREEN,
  MULTIWINDOW
}

/**
 * The custom color kind of a spot color
 */
declare enum SpotColorKind {
  SpotCMYK,
  SpotLAB,
  SpotRGB
}

/**
 * The type of line capping for a path stroke
 */
declare enum StrokeCap {
  BUTTENDCAP,
  PROJECTINGENDCAP,
  ROUNDENDCAP
}

/**
 * The type of joints for a path stroke
 */
declare enum StrokeJoin {
  BEVELENDJOIN,
  MITERENDJOIN,
  ROUNDENDJOIN
}

declare enum StyleRunAlignmentType {
  ROMANBASELINE,
  bottom,
  center,
  icfBottom,
  icfTop,
  top
}

/**
 * The alignment of a tab stop
 */
declare enum TabStopAlignment {
  Center,
  Decimal,
  Left,
  Right
}

/**
 * The orientation of text in a text art item
 */
declare enum TextOrientation {
  HORIZONTAL,
  VERTICAL
}

/**
 * The type of text art displayed by this object
 */
declare enum TextType {
  AREATEXT,
  PATHTEXT,
  POINTTEXT
}

declare enum TracingModeType {
  TRACINGMODEBLACKANDWHITE,
  TRACINGMODECOLOR,
  TRACINGMODEGRAY
}

/**
 * The point to use as the anchor point about which an object is
 * rotated, resized, or transformed
 */
declare enum Transformation {
  BOTTOM,
  BOTTOMLEFT,
  BOTTOMRIGHT,
  CENTER,
  DOCUMENTORIGIN,
  LEFT,
  RIGHT,
  TOP,
  TOPLEFT,
  TOPRIGHT
}

declare enum TrappingType {
  IGNOREOPAQUE,
  NORMALTRAPPING,
  OPAQUE,
  TRANSPARENT
}

/**
 * User interface settings
 */
declare enum UserInteractionLevel {
  DISPLAYALERTS,
  DONTDISPLAYALERTS
}

/**
 * What type of variables are included in the document
 */
declare enum VariableKind {
  GRAPH,
  IMAGE,
  TEXTUAL,
  Unknown,
  VISIBILITY
}

/**
 * The raster visualization mode for tracing.
 */
declare enum ViewRasterType {
  TRACINGVIEWRASTERADJUSTEDIMAGE,
  TRACINGVIEWRASTERNOIMAGE,
  TRACINGVIEWRASTERORIGINALIMAGE,
  TRACINGVIEWRASTERTRANSPARENTIMAGE
}

/**
 * The vector visualization mode for tracing.
 */
declare enum ViewVectorType {
  TRACINGVIEWVECTORNOTRACINGRESULT,
  TRACINGVIEWVECTOROUTLINES,
  TRACINGVIEWVECTOROUTLINESWITHTRACING,
  TRACINGVIEWVECTORTRACINGRESULT
}

declare enum WariChuJustificationType {
  Center,
  Left,
  Right,
  WARICHUAUTOJUSTIFY,
  WARICHUFULLJUSTIFY,
  WARICHUFULLJUSTIFYLASTLINECENTER,
  WARICHUFULLJUSTIFYLASTLINELEFT,
  WARICHUFULLJUSTIFYLASTLINERIGHT
}

/**
 * The method used to arrange an art item’s position in the stacking
 * order of its parent group or layer, as specified with the zOrder
 * method
 */
declare enum ZOrderMethod {
  BRINGFORWARD,
  BRINGTOFRONT,
  SENDBACKWARD,
  SENDTOBACK
}

interface ExportOptions extends Props<{}>{}

interface Gradients extends Props<Document>{}

interface Gradient{}

interface GraphItem {}
interface GraphItems extends Props<{}>{}

interface GroupItem {}
interface GroupItems extends Props<{}>{}

interface ImageCaptureOptions extends Props<{}>{}

declare type LayerParent = Document | Layer;

/**
 * A layer in an Illustrator document. Layers may contain nested layers, which
 * are called sublayers in the user interface.
 *
 * The `layer` object contains all of the page items in the specific layer as
 * elements. Your script can access page items as elements of either the `Layer`
 * object or as elements of the `Document` object. When accessing page items as
 * elements of a layer, only objects in that layer can be accessed. To access
 * page items throughout the entire document, be sure to refer to them as
 * contained by the document.
 */
interface Layer extends Props<LayerParent> {
  /**
   * The name of this layer.
   */
  name: string;

  /**
   * The path items contained in this layer.
   *
   * @readonly
   */
  pathItems: PathItems;

  /**
   * The placed items contained in this layer.
   *
   * @readonly
   */
  placedItems: PlacedItems;

  /**
   * The text art items contained in this layer.
   *
   * @readonly
   */
  textFrames: TextFrames;

  /**
   * Moves the object.
   */
  // @fixme move(relativeObject, insertionLocation: ElementPlacement): Layer;

  /**
   * Deletes this object.
   */
  remove(): void;

  /**
   * Arranges the layer’s position in the stacking order of the containing layer
   * or document ( parent ) of this object
   *
   * @param {ZOrderMethod} position
   */
  zOrder(position: ZOrderMethod): void;
}

interface Layers extends Collection<Layer>, Props<LayerParent> {}

interface LegacyTextItem {}
interface LegacyTextItems extends Props<{}>{}

/**
 * A transformation matrix specification, used to transform the geometry of
 * objects. Use it to specify and retrieve matrix information from an
 * Illustrator document or from page items in a document.
 *
 * Matrices are used in conjunction with the `transform` method and as a property
 * of a number of objects. A matrix specifies how to transform the geometry of
 * an object. You can generate an original matrix using the Application object
 * methods `getTranslationMatrix`, `getScaleMatrix`, or `getRotationMatrix`.
 *
 * A `Matrix` is a record containing the matrix values, not a reference to a
 * matrix object. The matrix commands operate on the values of a matrix record.
 * If a command modifies a matrix, a modified matrix record is returned as the
 * result of the command. The original matrix record passed to the command is
 * not modified.
 */
interface Matrix {
  /**
   * Matrix property a
   */
  mValueA: number;

  /**
   * Matrix property b
   */
  mValueB: number;

  /**
   * Matrix property c
   */
  mValueC: number;

  /**
   * Matrix property d
   */
  mValueD: number;

  /**
   * Matrix property tx
   */
  mValueTX: number;

  /**
   * Matrix property ty
   */
  mValueTY: number;

  /**
   * The class name of the referenced object.
   *
   * @readonly
   */
  typename: string;
}

interface MeshItem {}
interface MeshItems extends Props<{}>{}

declare type PageItem = CompoundPathItem | GraphItem | GroupItem | LegacyTextItem | MeshItem | PathItem | PlacedItem | PluginItem | RasterItem | SymbolItem | TextFrame;

interface IPageItem extends BaseProps<Layer | GroupItem> {
  /**
   * Is this object used to create a knockout.
   */
  artworkKnockout: KnockoutState;

  /**
   * The mode to use when compositing this object. An object
   * is considered composited when its opacity is set to less
   * than 100.0 (100%).
   */
  blendingMode: BlendModes;

  /**
   * The bounds of the object including stroke width and controls.
   *
   * @readonly
   */
  controlBounds: number[];

  /**
   * If `true`, this page item is editable.
   *
   * @readonly
   */
  editable: boolean;

  /**
   * The bounds of the object excluding stroke width.
   * Array of 4 numbers
   *
   * @readonly
   */
  geometricBounds: number[];

  /**
   * The height of the page item, calculated from the geometric bounds.
   * Range: 0.0 to 16348.0
   */
  height: number;

  /**
   * If `true`, this page item is hidden.
   */
  hidden: boolean;

  /**
   * If `true`, this object is isolated.
   */
  isIsolated: boolean;

  /**
   * The layer to which this page item belongs.
   *
   * @readonly
   */
  layer: Layer;

  /**
   * The left position of the art item.
   */
  left: number;

  /**
   * If `true`, this page item is locked.
   */
  locked: boolean;

  /**
   * The name of this item.
   */
  name: string;

  /**
   * The note assigned to this item.
   */
  note: string;

  /**
   * The opacity of this object, where 100.0 is completely opaque and 0.0 is completely transparent.
   */
  opacity: number;

  /**
   * True if this item is aligned to the pixel grid.
   */
  pixelAligned: boolean;

  /**
   * The position (in points) of the top left corner of the item object
   * in the format [x, y]. Does not include stroke weight.
   */
  position: number[];

  /**
   * If `true`, this object is selected.
   */
  selected: boolean;

  /**
   * If `true`, preserve slices.
   */
  sliced: boolean;

  /**
   * The collection of tags associated with this page item.
   */
  tags: Tags;

  /**
   * The top position of the art item.
   */
  top: number;

  /**
   * The value of the Adobe URL tag assigned to this page item.
   */
  URL: string;

  /**
   * The visibility variable to which this page item path is bound.
   */
  visibilityVariable: Variable;

  /**
   * The object’s visible bounds, including stroke width of any objects in the illustration.
   *
   * @readonly
   */
  visibleBounds: number[];

  /**
   * The width of the page item, calculated from the geometric bounds. Range: 0.0 to 16348.0
   */
  width: number;

  /**
   * If `true`, the text frame object should be wrapped inside this object.
   */
  wrapInside: boolean;

  /**
   * The offset to use when wrapping text around this object.
   */
  wrapOffset: number;

  /**
   * If `true`, wrap text frame objects around this object (text frame must be above the object).
   */
  wrapped: boolean;

  /**
   * The drawing order of the art within its group or layer.
   *
   * @readonly
   */
  zOrderPosition: number;

  /**
   * Places art object(s) in a perspective grid at a specified position and grid plane.
   *
   * @param {number} posX
   * @param {number} posY
   * @param {PerspectiveGridPlaneType} perspectiveGridPlane
   */
  bringInPerspective(posX: number, posY: number, perspectiveGridPlane: PerspectiveGridPlaneType): void;

  /**
   * Rotates the art item relative to the current rotation. The object is
   * rotated counter-clockwise if the angle value is positive, clockwise if
   * the value is negative.
   *
   * @param {number} angle
   * @param {boolean} [changePositions]
   * @param {boolean} [changeFillPatterns]
   * @param {boolean} [changeFillGradients]
   * @param {boolean} [changeStrokePattern]
   * @param {Transformation} [rotateAbout]
   */
  rotate(angle: number, changePositions?: boolean, changeFillPatterns?: boolean, changeFillGradients?: boolean, changeStrokePattern?: boolean, rotateAbout?: Transformation): void;

  /**
   * Transforms the art item by applying a transformation matrix.
   *
   * @param {matrix} Matrix
   * @param {boolean} [changePositions]
   * @param {boolean} [changeFillPatterns]
   * @param {boolean} [changeFillGradients]
   * @param {boolean} [changeStrokePattern]
   * @param {boolean} [changeLineWidths]
   * @param {Transformation} [transformAbout]
   */
  transform(matrix: Matrix, changePositions?: boolean, changeFillPatterns?: boolean, changeFillGradients?: boolean, changeStrokePattern?: boolean, changeLineWidths?: boolean, transformAbout?: Transformation): void;

  /**
   * Repositions the art item relative to the current position, where `deltaX`
   * is the horizontal offset and `deltaY` is the vertical offset.
   *
   * @param {number} [deltaX]
   * @param {number} [deltaY]
   * @param {boolean} [transformObjects]
   * @param {boolean} [transformFillPatterns]
   * @param {boolean} [transformFillGradients]
   * @param {boolean} [transformStrokePatterns
   */
  translate(deltaX?: number, deltaY?: number, transformObjects?: boolean, transformFillPatterns?: boolean, transformFillGradients?: boolean, transformStrokePatterns?: boolean): void;

  /**
   * Arranges the art relative to other art in the group or layer.
   *
   * @param {ZOrderMethod} zOrderCmd
   */
  zOrder(zOrderCmd: ZOrderMethod): void;
}

/**
 * A collection of page item objects. Provides complete access to all the art
 * items in an Illustrator document in the following classes:
 *
 * CompoundPathItem
 * GraphItem
 * GroupItem
 * LegacyTextItem
 * MeshItem
 * PathItem
 * PlacedItem
 * PluginItem
 * RasterItem
 * SymbolItem
 * TextFrame
 *
 * You can reference page items through the `PageItems` property in a `Document`,
 * `Layer`, or `Group`. When you access an individual item in one of these
 * collections, the reference is a page item of one of a particular type.
 * For example, if you use `PageItems` to reference a graph item, the typename
 * value of that object is `GraphItem`.
 */
interface PageItems extends Collection<PageItem>, Props<Layer>{}

/**
 * Associates character and paragraph attributes with a style name.
 * The style object can be used to apply those attributes to the text
 * in a TextFrame object.
 */
interface ParagraphStyle extends BaseProps<Document> {
  /**
   * The character properties for the text range.
   *
   * @readonly
   */
  characterAttributes: CharacterAttributes;

  /**
   * The paragraph style’s name.
   */
  name: string;

  /**
   * The paragraph properties for the text range.
   *
   * @readonly;
   */
  paragraphAttributes: ParagraphAttributes;

  /**
   * Applies this paragraph style to the specified text item.
   *
   * @param {TextRange} textItem @fixme
   * @param {boolean} clearingOverrides
   */
  applyTo(textItem: TextRange, clearingOverrides?: boolean): void;

  /**
   * Deletes the object.
   */
  remove(): void;
}

interface ParagraphStyles extends CollectionIterable<ParagraphStyle>, Props<Document> {
  /**
   * Creates a named paragraph style.
   */
  add(name: string): ParagraphStyle;

  /**
   * Gets the first element in the collection with the provided name.
   *
   * @param {string} name
   * @returns {ParagraphStyle}
   */
  getByName(name: string): ParagraphStyle;

  /**
   * Deletes all elements in this collection.
   */
  removeAll(): void;
}

/**
 * A collection of TextRange objects, with each TextRange representing
 * a paragraph. The elements are not named; you must access them by index.
 */
interface Paragraphs extends CollectionIterable<TextFrame>, Props<TextFrame> {
  /**
   * Adds a new paragraph with specified text contents at the specified location
   * in the current document. If location is not specified, adds the new paragraph
   * to the containing text frame after the current text selection or insertion point.
   *
   * @param {string} contents
   * @param {TextFrame} [relativeObject]
   * @param {ElementPlacement} [insertionLocation]
   * @returns {TextRange}
   */
  add(contents: string, relativeObject?: TextFrame, insertionLocation?: ElementPlacement): TextRange;

  /**
   * Adds a new paragraph with specified text contents before the current text
   * selection or insertion point.
   *
   * @param {string} contents
   * @returns {TextRange}
   */
  addBefore(contents: string): TextRange;

  /**
   * Deletes all elements in this collection.
   */
  removeAll(): void;
}

/**
 * Specifies the properties and attributes of a paragraph contained
 * in a text frame.
 *
 * Note: Paragraph attributes do not have default values, and are `undefined`
 * until explicitly set.
 */
interface ParagraphAttributes {
  /**
   * Auto leading amount expressed as a percentage.
   */
  autoLeadingAmount: number;

  /**
   * If `true`, BunriKinshi is enabled.
   */
  bunriKinshi: boolean;

  /**
   * The Burasagari type.
   */
  burasagariType: BurasagariTypeEnum;

  /**
   * Desired glyph scaling, expressed as a percentage of the default character
   * width. Range: 50.0 to 200.0. At 100.0, the width of characters is not changed.
   */
  desiredGlyphScaling: number;

  /**
   * Desired letter, spacing expressed as a percentage of the default kerning or
   * tracking Range: -100.0 to 500.0. At 0, no space is added between letters.
   * At 100.0, an entire space width is added between letters.
   */
  desiredLetterSpacing: number;

  /**
   * Desired word spacing, expressed as a percentage of the default space for
   * the font. Range: 0.0 to 1000.0; at 100.00. No space is added between words.
   */
  desiredWordSpacing: number;

  /**
   * If `true`, the Every-line Composer is enabled. If `false`, the Single-line
   * Composer is enabled.
   */
  everyLineComposer: boolean;

  /**
   * First line left indent in points.
   */
  firstLineIndent: number;

  /**
   * If `true`, hyphenation is enabled for capitalized words.
   */
  hyphenateCapitalizedWords: boolean;

  /**
   * If `true`, hyphenation is enabled for the paragraph.
   */
  hyphenation: boolean;

  /**
   * Hyphenation preference scale for better spacing (0) or fewer hyphens (1).
   * Range: 0.0 to 1.0
   */
  hyphenationPreference: boolean;

  /**
   * The distance (in points) from the right edge of the paragraph that marks
   * the part of the line where hyphenation is not allowed.
   *
   * NOTE: 0 allows all hyphenation. Valid only when everyLineComposer is `false`.
   */
  hyphenationZone: number;

  /**
   * Paragraph justification.
   */
  justification: Justification;

  /**
   * The Kinsoku Shori name.
   */
  kinsoku: string;

  /**
   * The preferred Kinsoku order.
   */
  kinsokuOrder: KinsokuOrderEnum;

  /**
   * If `true`, KurikaeshiMojiShori is enabled.
   */
  kurikaeshiMojiShori: boolean;

  /**
   * Auto leading type.
   */
  leadingType: AutoLeadingType;

  /**
   * The left indent of margin in points.
   */
  leftIndent: number;

  /**
   * Maximum number of consecutive hyphenated lines.
   */
  maximumConsecutiveHyphens: number;

  /**
   * Maximum glyph scaling, expressed as a percentage of the default character
   * width. Range: 50.0 to 200.0; at 100.0. The width of characters is not changed.
   *
   * NOTE: Valid only for justified paragraphs.
   */
  maximumGlyphScaling: number;

  /**
   * Maximum letter spacing, expressed as a percentage of the default kerning or
   * tracking Range: -100.0 to 500.0; at 0. No space is added between letters.
   * At 100.0, an entire space width is added between letters.
   *
   * NOTE: Valid only for justified paragraphs.
   */
  maximumLetterSpacing: number;

  /**
   * Maximum word spacing, expressed as a percentage of the default space for the
   * font. Range: 0.0 to 1000.0; at 100.00. No space is added between words.
   *
   * NOTE: Valid only for justified paragraphs.
   */
  maximumWordSpacing: number;

  /**
   * Minimum number of characters after a hyphen.
   */
  minimumAfterHyphen: number;

  /**
   * Minimum number of characters before a hyphen.
   */
  minimumBeforeHyphen: number;

  /**
   * Minimum glyph scaling, expressed as a percentage of the default character width.
   * Range: 50.0 to 200.0. At 100.0, the width of characters is not changed.
   *
   * NOTE: Valid only for justified paragraphs.
   */
  minimumGlyphScaling: number;

  /**
   * Minimum number of characters for a word to be hyphenated.
   */
  minimumHyphenatedWordSize: number;

  /**
   * Minimum letter spacing, expressed as a percentage of the default kerning or
   * tracking Range: -100.0 to 500.0; at 0. No space is added between letters.
   * At 100.0, an entire space width is added between letters.
   *
   * NOTE: Valid only for justified paragraphs.
   */
  minimumLetterSpacing: number;

  /**
   * Minimum word spacing, expressed as a percentage of the default space for the
   * font. Range: 0.0 to 1000.0; at 100.00. No space is added between words.
   *
   * NOTE: Valid only for justified paragraphs.
   */
  minimumWordSpacing: number;

  /**
   * The Mojikumi name.
   */
  mojikumi: string;

  /**
   * The object’s container.
   *
   * @readonly
   */
  parent: Object;

  /**
   * Right indent of margin in points.
   */
  rightIndent: number;

  /**
   * If `true`, Roman hanging punctuation is enabled.
   */
  romanHanging: boolean;

  /**
   * Single word justification.
   */
  singleWordJustification: Justification;

  /**
   * Spacing after paragraph in points.
   */
  spaceAfter: number;

  /**
   * Spacing before paragraph in points.
   */
  spaceBefore: number;

  /**
   * Tab stop settings.
   */
  tabStops: TabStopInfo;

  /**
   * The class name of the object.
   */
  typename: string;
}

/**
 * Information about the alignment, position, and other details for a tab stop
 * in a `ParagraphAttributes` object.
 */
interface TabStopInfo {
  /**
   * The alignment of the tab stop. Default: `Left`
   */
  alignment: TabStopAlignment;

  /**
   * The character used for decimal tab stops. Default: `.`
   */
  decimalCharacter: string;

  /**
   * The leader dot character.
   */
  leader: string;

  /**
   * The position of the tab stop expressed in points. Default: 0.0
   */
  position: number;

  /**
   * The class name of the object.
   *
   * @readonly
   */
  typename: string;
}

interface PathItem extends IPageItem {
  /**
   * The area of this path in square points. If the area is negative, the path
   * is wound counterclockwise. Self-intersecting paths can contain sub-areas
   * that cancel each other out, which makes this value zero even though the
   * path has apparent area.
   *
   * @readonly
   */
  area: number;

  /**
   * If `true`, this path should be used as a clipping path.
   */
  clipping: boolean;

  /**
   * If true, this path is closed.
   */
  closed: boolean;

  /**
   * If `true`, the even-odd rule should be used to determine "insideness".
   */
  evenodd: boolean;

  /**
   * The fill color of the path.
   */
  fillColor: Color;

  /**
   * If true, the path be filled.
   */
  filled: boolean;

  /**
   * If `true`, the art beneath a filled object should be overprinted.
   */
  fillOverprint: boolean;

  /**
   * If `true`, this path is a guide object.
   */
  guides: boolean;

  /**
   * The length of this path in points.
   */
  length: number;

  /**
   * The path points contained in this path item.
   *
   * @readonly
   */
  pathPoints: PathPoints;

  /**
   * The polarity of the path.
   */
  polarity: PolarityValues;

  /**
   * The resolution of the path in dots per inch (dpi).
   */
  resolution: number;

  /**
   * All of the selected path points in the path.
   *
   * @readonly
   */
  selectedPathPoints: PathPoints;

  /**
   * The type of line capping.
   */
  strokeCap: StrokeCap;

  /**
   * The stroke color for the path.
   */
  strokeColor: Color;

  /**
   * If true, the path should be stroked.
   */
  stroked: boolean;

  /**
   * Dash lengths. Set to an empty object, {} , for a solid line.
   */
  strokeDashes: Object;

  /**
   * The default distance into the dash pattern at which the pattern
   * should be started.
   */
  strokeDashOffset: number;

  /**
   * Type of joints for the path.
   */
  strokeJoin: StrokeJoin;

  /**
   * When a default stroke join is set to `mitered`, this property specifies
   * when the join will be converted to beveled (squared-off) by default.
   * The default miter limit of 4 means that when the length of the point
   * reaches four times the stroke weight, the join switches from a miter join
   * to a bevel join. A value of 1 specifies a bevel join.
   *
   * Range: 1 to 500. Default: 4 
   */
  strokeMiterLimit: number;
 
  /**
   * If `true`, the art beneath a stroked object should be overprinted.
   */
  strokeOverprint: boolean;

  /**
   * The width of the stroke (in points).
   */
  strokeWidth: number;

  /**
   * Creates a duplicate of the selected object.
   *
   * @param {PathItem} [relativeObject]
   * @param {ElementPlacement} [insertionLocation]
   * @returns {PathItem}
   */
  duplicate(relativeObject?: PathItem, insertionLocation?: ElementPlacement): PathItem;

  /**
   * Moves the object.
   *
   * @param {PathItem} relativeObject
   * @param {ElementPlacement} insertionLocation
   * @returns {PathItem}
   */
  move(relativeObject: PathItem, insertionLocation: ElementPlacement): PathItem;

  /**
   * Deletes this object.
   */
  remove(): void;

  /**
   * Scales the art item where scaleX is the horizontal scaling factor and
   * scaleY is the vertical scaling factor. 100.0 = 100%.
   *
   * @param {number} scaleX,
   * @param {number} scaleY
   * @param {boolean} [changePositions]
   * @param {boolean} [changeFillPatterns]
   * @param {boolean} [changeFillGradients]
   * @param {boolean} [changeStrokePattern]
   * @param {number} [changeLineWidths]
   * @param {Transformation} [scaleAbout]
   */
  resize(scaleX: number, scaleY: number, changePositions?: boolean, changeFillPatterns?: boolean, changeFillGradients?: boolean, changeStrokePattern?: boolean, changeLineWidths?: number, scaleAbout?: Transformation): void;

  /**
   * Sets the path using an array of points specified as [x, y] coordinate pairs.
   *
   * @param {array} array of [x, y] coordinate pairs
   */
  setEntirePath(pathPoints: Point[]): void;
}

interface PathItems extends Collection<PathItem>, Props<Layer> {}


interface PathPoint extends BaseProps<PathItem> {
  /**
   * The position of this point’s anchor point.
   */
  anchor: number[];

  /**
   * The position of this path point’s in control point.
   */
  leftDirection: number[];

  /**
   * The position of this path point’s out control point.
   */
  rightDirection: number[];

  /**
   * The type of path point, either a curve or a corner. Any point can
   * considered a corner point. Setting the type to a corner forces the left
   * and right direction points to be on a straight line when the user attempts
   * to modify them in the user interface.
   */
  pointType: PointType;

  /**
   * Are points of this path point selected, and if so, which ones.
   */
  selected: PathPointSelection;

  /**
   * Removes the referenced point from the path.
   */
  remove(): void;
}

interface PathPoints extends Collection<PathPoint>, Props<PathItem> {}

interface Patterns extends Props<{}>{}

interface Pattern{}

/**
 * An artwork item placed in a document as a linked file. For example,
 * an artwork object created using the File > Place command in Illustrator
 * or using the add() method of the placedItems collection object is a
 * placed item
 */
interface PlacedItem extends IPageItem {
  /**
   * The dimensions of the placed art item regardless of transformations.
   *
   * @readonly
   */
  boundingBox: number[];

  /**
   * The content variable bound to the item.
   */
  contentVariable: Variable;

  /**
   * The file containing the artwork.
   */
  file: FileInstance;

  /**
   * The transformation matrix of the placed artwork.
   */
  matrix: Matrix;

  /**
   * Creates a duplicate of the selected object.
   *
   * @param {PageItem} [relativeObject]
   * @param {ElementPlacement} [insertionLocation]
   * @returns {PlacedItem}
   */
  duplicate(relativeObject?: PageItem, insertionLocation?: ElementPlacement): PlacedItem;

  /**
   * Embeds this art in the document. Converts the art to art item objects as needed
   * and deletes this object.
   */
  embed(): void;

  /**
   * Moves the object.
   *
   * @param {PageItem} relativeObject
   * @param {ElementPlacement} insertionLocation
   * @returns {PlacedItem}
   */
  move(relativeObject: PageItem, insertionLocation: ElementPlacement): PlacedItem;

  /**
   * Relinks the art object with the file that defines its content.
   *
   * @param {FileInstance} linkFile
   */
  relink(linkFile: FileInstance): void;

  /**
   * Deletes this object.
   */
  remove(): void;
}

interface PlacedItems extends Collection<PlacedItem> {}

interface PluginItem {}
interface PluginItems extends Props<{}>{}

interface PrintOptions extends Props<{}>{}

interface RasterItem {}
interface RasterItems extends Props<{}>{}

/**
 * A custom color definition contained in a SpotColor object.
 *
 * If no properties are specified when creating a spot, default values are
 * provided. However, if specifying the color, you must use the same color
 * space as the document, either CMYK or RGB. Otherwise, an error results.
 * The new spot is added to the end of the swatches list in the Swatches palette.
 */
interface Spot extends BaseProps<Document> {
  /**
   * The color information for this spot color.
   */
  color: Color;

  /**
   * The color model for this custom color.
   */
  colorType: ColorModel;

  /**
   * The spot color’s name.
   */
  name: string;

  /**
   * The kind of spot color (RGB, CMYK or LAB). This is the name of the color
   * kind contained in the spot object.
   *
   * @readonly
   */
  spotKind: SpotColorKind;

  /**
   * Gets the internal color of a spot.
   *
   * @return {array}
   */
  getInternalColor(): number[];

  /**
   * Deletes this object.
   */
  remove(): void;
}

interface Spots extends Collection<Spot>, Props<Document>{}

interface Stories extends Props<{}>{}

interface Swatches extends Props<{}>{}

interface Symbols extends Props<{}>{}

interface SymbolItem {}
interface SymbolItems extends Props<{}>{}

interface Tags extends Props<Application> { // @fixme check
}

/**
 * The basic art item for displaying text. From the user interface, this is
 * text created with the Text tool. There are three types of text art in
 * Illustrator: point text, path text, and area text. The type is indicated
 * by the text frame’s kind property.
 *
 * When you create a text frame, you also create a Story object. However,
 * threading text frames combines the frames into a single story object. To
 * thread frames, use the nextFrame or previousFrame property.
 */
interface TextFrame {
  /**
   * The text string
   */
  contents: string;

  position: number[];

  /**
   * The text range of the text frame.
   *
   * @readonly
   */
  textRange: TextRange;
}

interface TextFrames extends Collection<TextFrame>, Props<Layer> {
  /**
   * Creates an area text frame item.
   *
   * @param {PathItem} textPath
   * @param {TextOrientation} [orientation]
   * @param {TextFrame} [baseFrame]
   * @param {boolean} [postFix]
   * @returns {TextFrame}
   */
  areaText(textPath: PathItem, orientation?: TextOrientation, baseFrame?: TextFrame, postFix?: boolean): TextFrame;

  /**
   * Creates an on-path text frame item.
   *
   * @param {PathItem} textPath
   * @param {number} [startTValue]
   * @param {number} [endTValue]
   * @param {TextOrientation} [orientation]
   * @param {TextFrame} [baseFrame]
   * @param {boolean} [postFix]
   * @returns {TextFrame}
   */
  pathText(textPath: PathItem, startTValue?: number, endTValue?: number, orientation?: TextOrientation, baseFrame?: TextFrame, postFix?: boolean): TextFrame;

  /**
   * Creates a point text frame item.
   *
   * @param {array} anchor array of 2 numbers
   * @param {TextOrientation} [orientation]
   * @returns {TextFrame}
   */
  pointText(anchor: number[], orientation?: TextOrientation): TextFrame;
}

interface TextRange {
  fillColor: Color;
  size: number;
}

/**
 * A document-level variable that can be imported or exported.
 *
 * A variable is a dynamic object used to create data-driven graphics.
 * For an example, see Dataset. Variables are accessed in Illustrator
 * through the Variables palette.
 */
interface Variable extends BaseProps<Document> {
  /**
   * The variable’s type.
   */
  kind: VariableKind;

  /**
   * The name of the variable.
   */
  name: string;

  /**
   * All of the artwork in the variable.
   *
   * @readonly
   */
  pageItems: PageItems;

  /**
   * Removes the variable from the collection of variables.
   */
  remove(): void;
}

/**
 * The collection of `Variable` objects in the document. For an example of how
 * to create variables, see `Using variables and datasets`.
 */
interface Variables extends Collection<Variable>, Props<Documents>{}

interface View {
  /**
   * The bounding rectangle of this view relative to the current document’s bounds.
   *
   * @readonly
   */
  bounds: number[];

  /**
   * The center point of this view relative to the current document’s bounds.
   */
  centerPoint: number[];

  /**
   * The document that contains this view.
   *
   * @readonly
   */
  parent: Document;

  /**
   * The mode of display for this view.
   */
  screenMode: ScreenMode;

  /**
   * The class name of the referenced object.
   * @readonly
   */
  typename: string;

  /**
   * The zoom factor of this view, where 100.0 is 100%.
   */
  zoom: number;
}

interface Views extends Props<Application> { // @fixme check
  /**
   * Gets an element from the collection.
   *
   * @param {number} index
   * @returns {View}
   */
  [index: number]: View;
}
