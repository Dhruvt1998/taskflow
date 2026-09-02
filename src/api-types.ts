export interface ApiSuccess<T> {
    success : true,
    data : T
}

export interface ApiFailure {
    success : false,
    error : string
}

export type ApiResult<T> =
    | ApiSuccess<T>
    | ApiFailure;

export function failure(
    error : string
): ApiFailure {
    return { success: false, error}
}

export function unwrapResult<T>(
    result : ApiResult<T>
) : T {
    if (result.success === true){
        return result.data
    }
    throw new Error(result.error);
}

export function success<T>(
    data : T
): ApiSuccess<T> {
    return {
        success : true,
        data
    };
}

export async function safeExecute<T>(
    operation: () => Promise<T>
): Promise<ApiResult<T>>{
    try{
        const result = await operation();

        return success(result);
    }
    catch (error){
        if(error instanceof Error){
            return failure(error.message);
        }
        return failure("Unknown error");
    }
}