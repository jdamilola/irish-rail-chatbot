export type HeaderProps = {
    title: string;
};

export type FooterProps = {
    placeholder: string;
    onSubmit: (message: string) => void;
};

export enum MessageType {
    BOT = 'bot',
    USER = 'user'
};

export type IMessage = {
    content?: string;
    htmlContent?: string;
    type: MessageType;
};

export type IChatBot = {
    headerTitle: string;
    messages?: IMessage[];
};

export type Station = {
    id: string;
    code: string;
    name: string;
    alias?: string;
    latitude: number;
    longitude: number;
}

export type Train = {
    code: string;
    date: string;
    origin: string;
    destination: string;
    originTime: string;
    destinationTime: string;
    status: string;
    lastLocation: string;
    dueIn: string;
    late: string;
    expectedArrival: string;
    expectedDeparture: string;
    scheduledArrival: string;
    scheduledDeparture: string;
    direction: string;
    type: string;
    locationType: string;
}

export type StationData = {
    code: string;
    name: string;
    trains: Train[];
}

export enum ChatbotActionType {
    SEND_MESSAGE = 'SEND_MESSAGE'
}

export type ChatbotAction = {
    type: ChatbotActionType;
    payload: string;
}

export type ChatbotState = {
    messages: IMessage[];
}