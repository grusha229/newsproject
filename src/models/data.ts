/** интерфейс для данных о новостях */ 
export interface IData_SnippetNews {
    /** идентификатор новости */
    ID: number;
    /** заголовок новости */
    TI: string;
    /** содержимое новости */
    AB: string;
    /** ссылка на новость */
    URL: string;
    /** домен */
    DOM: string;
    /** дата и время публикации новости в формате '%Y-%m-%dT%H:%M:%S') */
    DP: string;
    /** язык новости */
    LANG: string;
    /** охват новости */
    REACH: number;
    /** ключевые слова */
    KW: IData_TagItem[];
    /** автор новости */
    AU: string[];
    /** страна */
    CNTR: string;
    /** код страны */
    CNTR_CODE: string;
    /** сантимент новости */
    SENT: TData_SentType;
    /** траффик из стран */
    TRAFFIC: IData_TrafficItem[];
    /** ссылка на иконку */
    FAV: string;
    /** блоки содержимого новости с ключевыми словами */
    HIGHLIGHTS: string[];
}
/** тэг для сниппета */
export interface IData_TagItem {
    /** название тега */
    value: string;
    /** кол-во тегов с указанным названием */
    count: number;
}
/** траффик для сниппета */
export interface IData_TrafficItem {
    /**  название страны-источник траффика */
    value: string;
    /** объём траффика для указанной страны */
    count: number;
}
export type TData_SentType = "negative" | "positive" | 'neutral'