export interface IResponse {
	// name of the message
	key: string;

	// response body
	responseBody: {
		replies: {
			text: string
		}[],
		suggestedActions: [],
		inputHint: string;
	}
}