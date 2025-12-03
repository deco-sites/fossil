/**
 * SDK de integração com a API do Dito
 * @see https://ingest.dito.com.br/docs/index.html
 */

const DITO_API_URL = "https://ingest.dito.com.br/v2/events";
const DITO_BRAND = "fossil";
const DITO_API_KEY =
    "MjAyNS0xMC0xNyAwOTo1MTozMCAtMDMwMEbDs3NzaWwgLSBPZmljaWFsNDY5";

/**
 * Tipos de ação para eventos do Dito
 */
export type DitoEventAction =
    | "newsletter_subscribe"
    | "popup_subscribe"
    | "checkout_optin"
    | "identify";

/**
 * Tipo de evento do Dito
 */
export type DitoEventType = "IDENTIFY" | "TRACK";

/**
 * Contexto do browser
 */
export interface DitoBrowserContext {
    name?: string;
    version?: string;
}

/**
 * Contexto do sistema operacional
 */
export interface DitoOSContext {
    name?: string;
    version?: string;
}

/**
 * Contexto da plataforma
 */
export interface DitoPlatformContext {
    name?: string;
    type?: string;
}

/**
 * Parâmetros UTM
 */
export interface DitoUTMContext {
    campaign?: string;
    medium?: string;
    source?: string;
}

/**
 * Contexto completo do evento
 */
export interface DitoContext {
    browser?: DitoBrowserContext;
    os?: DitoOSContext;
    platform?: DitoPlatformContext;
    referrer?: string;
    user_agent?: string;
    utm?: DitoUTMContext;
}

/**
 * Endereço do usuário
 */
export interface DitoAddress {
    city?: string;
    country?: string;
    postal_code?: string;
    state?: string;
    street?: string;
}

/**
 * Traits do usuário (identificação)
 */
export interface DitoTraits {
    address?: DitoAddress;
    birthday?: string;
    created_at?: string;
    custom_data?: Record<string, string>;
    email?: string;
    gender?: "male" | "female" | "other";
    id?: string;
    name?: string;
    phone?: string;
    timezone?: string;
}

/**
 * Propriedades do evento
 */
export interface DitoProperties {
    currency?: string;
    custom_data?: Record<string, string>;
    revenue?: number;
}

/**
 * Evento do Dito
 */
export interface DitoEvent {
    action: DitoEventAction | string;
    context?: DitoContext;
    message_id?: string;
    properties?: DitoProperties;
    timestamp?: string;
    traits?: DitoTraits;
    type: DitoEventType;
    user_id?: string;
}

/**
 * Origem do cadastro de newsletter
 */
export type NewsletterSource = "popup" | "footer" | "checkout";

/**
 * Dados do formulário de newsletter
 */
export interface NewsletterFormData {
    email: string;
    name?: string;
    phone?: string;
    dateOfBirth?: string;
    newsletter?: boolean;
    source: NewsletterSource;
}

/**
 * Gera um ID único para a mensagem
 */
function generateMessageId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Converte data de nascimento DD/MM/AAAA para formato ISO
 */
function parseBirthday(dateOfBirth?: string): string | undefined {
    if (!dateOfBirth) return undefined;

    // Formato esperado: DD/MM/AAAA
    const parts = dateOfBirth.split("/");
    if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    return dateOfBirth;
}

/**
 * Mapeia a origem para a ação correspondente
 */
function getActionFromSource(source: NewsletterSource): DitoEventAction {
    switch (source) {
        case "popup":
            return "popup_subscribe";
        case "footer":
            return "newsletter_subscribe";
        case "checkout":
            return "checkout_optin";
        default:
            return "newsletter_subscribe";
    }
}

/**
 * Cria um evento de identificação/cadastro de newsletter para o Dito
 */
export function createNewsletterEvent(
    data: NewsletterFormData,
    context?: DitoContext,
): DitoEvent {
    const now = new Date().toISOString();

    return {
        action: getActionFromSource(data.source),
        context,
        message_id: generateMessageId(),
        properties: {
            custom_data: {
                source: data.source,
                newsletter_optin: data.newsletter ? "true" : "false",
            },
        },
        timestamp: now,
        traits: {
            email: data.email,
            name: data.name,
            phone: data.phone,
            birthday: parseBirthday(data.dateOfBirth),
            created_at: now,
            custom_data: {
                origin: `fossil_website_${data.source}`,
            },
        },
        type: "IDENTIFY",
        user_id: data.email, // Usando email como user_id
    };
}

/**
 * Opções de configuração do cliente Dito
 */
export interface DitoClientOptions {
    apiUrl?: string;
    brand?: string;
    apiKey?: string;
}

/**
 * Envia eventos para a API do Dito
 */
export async function sendDitoEvents(
    events: DitoEvent[],
    options?: DitoClientOptions,
): Promise<Response> {
    const apiUrl = options?.apiUrl ?? DITO_API_URL;
    const brand = options?.brand ?? DITO_BRAND;
    const apiKey = options?.apiKey ?? DITO_API_KEY;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "brand": brand,
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(events),
    });

    return response;
}

/**
 * Envia um único evento para a API do Dito
 */
export function sendDitoEvent(
    event: DitoEvent,
    options?: DitoClientOptions,
): Promise<Response> {
    return sendDitoEvents([event], options);
}

/**
 * Envia um cadastro de newsletter para o Dito
 */
export function sendNewsletterToDito(
    data: NewsletterFormData,
    context?: DitoContext,
    options?: DitoClientOptions,
): Promise<Response> {
    const event = createNewsletterEvent(data, context);
    return sendDitoEvent(event, options);
}

export default {
    sendDitoEvents,
    sendDitoEvent,
    sendNewsletterToDito,
    createNewsletterEvent,
};
