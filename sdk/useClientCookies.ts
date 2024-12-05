interface CookieOptions {
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  path?: string;
}

export function setCookie(
  name: string,
  value: string,
  days?: number,
  options?: CookieOptions,
): void {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  let cookieStr = `${name}=${encodeURIComponent(value)}${expires}; path=${
    options?.path || "/"
  }`;

  if (options) {
    if (options.domain) {
      cookieStr += `; domain=${options.domain}`;
    }
    if (options.secure) {
      cookieStr += "; secure";
    }
    if (options.sameSite) {
      cookieStr += `; samesite=${options.sameSite}`;
    }
  }

  document.cookie = cookieStr;
}

export function getCookie(name: string): string | undefined {
  const nameEQ = name + "=";
  const cookiesArray = document.cookie.split(";");
  for (let i = 0; i < cookiesArray.length; i++) {
    let c = cookiesArray[i];
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return undefined;
}

export function deleteCookie(name: string, options?: CookieOptions): void {
  setCookie(name, "", -1, options);
}
