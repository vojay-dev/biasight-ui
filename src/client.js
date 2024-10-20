import {API_BASE_URI} from './config.js'

export async function getHeaders() {
    return {
        'Content-Type': 'application/json'
    }
}

export async function getRequestOptions(method, body) {
    return {
        method,
        headers: await getHeaders(),
        body: JSON.stringify(body),
        redirect: 'follow'
    }
}

export async function handleResponse(response) {
    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText)
    }

    return response.json()
}

export async function analyze(uri) {
    const analyzeEndpoint = `${API_BASE_URI}/analyze`
    const requestBody = { uri: uri }

    try {
        const response = await fetch(analyzeEndpoint, await getRequestOptions('POST', requestBody))
        const analyzeResponse = await handleResponse(response)

        return {
            result: analyzeResponse.result,
            error: null
        }
    } catch (err) {
        return {
            result: null,
            error: err.message
        }
    }
}

export async function getLimit() {
    const limitEndpoint = `${API_BASE_URI}/limit`

    try {
        const response = await fetch(limitEndpoint, await getRequestOptions('GET'))
        const limitResponse = await handleResponse(response)

        return {
            result: limitResponse,
            error: null
        }
    } catch (err) {
        return {
            result: null,
            error: err.message
        }
    }
}
