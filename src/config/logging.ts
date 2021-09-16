const getTimestamp = (): string => {
    return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.info(`[${getTimestamp()}] [INFO] ${namespace}: ${message}`, object);
    } else {
        console.info(`[${getTimestamp()}] [INFO] ${namespace}: ${message}`);
    }
};

const warn = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.warn(`[${getTimestamp()}] [WARN] ${namespace}: ${message}`, object);
    } else {
        console.warn(`[${getTimestamp()}] [WARN] ${namespace}: ${message}`);
    }
};

const debug = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.debug(`[${getTimestamp()}] [DEBUG] ${namespace}: ${message}`, object);
    } else {
        console.debug(`[${getTimestamp()}] [DEBUG] ${namespace}: ${message}`);
    }
};

const error = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.error(`[${getTimestamp()}] [ERROR] ${namespace}: ${message}`, object);
    } else {
        console.error(`[${getTimestamp()}] [ERROR] ${namespace}: ${message}`);
    }
};

export default {
    info,
    warn,
    debug,
    error
};
