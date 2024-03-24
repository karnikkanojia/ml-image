export type FormDataType = {
    data: DiagnosisPredictions | null | any,
    error: Error | any | null
} | undefined;

export type Prediction = {
    prediction: number,
    gradcam: string
}

export type PredictionsDict = {
    [disease: string]: Prediction
}

export type DiagnosisPredictions = {
    predictions: PredictionsDict,
    name: string
}
