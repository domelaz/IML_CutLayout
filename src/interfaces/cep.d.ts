/**
 * Illustrator Error Struct
 */
interface ILSTError {
  end?: number;
  fileName?: string;
  line?: number;
  message: string;
  name?: string;
  number?: number;
  source?: string;
  start?: number;
}

/**
 * Протокол CEP->ILST
 */
interface CEPCommand {
  /**
   * Имя метода, который обрабатывает запрос на стороне Иллюстратора
   */
  handler: string;

  /**
   * Набор данных для этого метода
   */
  data?: any;

  /**
   * Status bar message
   */
  message?: string;
}

/**
 * Ответ ILST->CEP
 */
interface CEPResponse {
  /**
   * Статус обработки команды
   */
  status: string;

  /**
   * Данные, возвращаемые методом
   */
  data?: any;
}

/**
 * ILST Error -> CEP
 */
interface CEPError {

  error: ILSTError;

  /**
   * ILST method
   */
  handler: string;
}
