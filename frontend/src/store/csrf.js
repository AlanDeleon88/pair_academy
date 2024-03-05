import Cookies from 'js-cookie'


export async function csrfFetch(url, options = {}) {
    //! default to GET method if no options are passed in.
    options.method = options.method || 'GET';

    //! default to blank object if no headers were defined.
    options.headers = options.headers || {};

    //! if options.method is not get, then set the "Content-Type" header
    //! to "application/json", and set the "XSRF-TOKEN" header to the value
    //! of the "XSRF-TOKEN" cookie

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] =
            options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    //? call the default window's fetch with the url and options passed in.
    const res = await window.fetch(url, options);
    //? if the response status is code is above 400, then throw an error with
    //? the error being the response.
    if (res.status >= 400) throw res;

    //! if the  response code is under 400, return the response to the next promise chain.
    return res
}


export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
