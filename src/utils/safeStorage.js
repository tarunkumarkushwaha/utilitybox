const isChromeExtension = () =>
    typeof chrome !== "undefined" && chrome.storage?.local;

export const safeStorageSet = (key, value) => {
    if (!isChromeExtension()) return;
    chrome.storage.local.set({ [key]: value });
};

export const safeStorageGet = (key) => {
    return new Promise((resolve) => {
        if (!isChromeExtension()) {
            resolve(null);
            return;
        }

        chrome.storage.local.get([key], (result) => {
            resolve(result[key] ?? null);
        });
    });
};
