export interface FilteredClientAnswer {
    question: number;
    client_answer: number;
}

export interface ClientAnswer {
    question: number;
    client_answer: number | string;
}

export interface ClientInfo {
    _id?: string;
    PID: number;
    first_name: string;
    last_name: string;
}

export interface ClientQuestionAnswer {
    interview_id: string;
    question_id: number;
    answer_value: string | number;
}

export interface ClientSurvey {
    _id: string;
    PID: number;
    first_name: string;
    last_name: string;
    answers: ClientAnswer[];
    applicable_questions: number;
    total_score: number;
}

export class QuestionInfo {
    _id: number;
    open_ended: boolean;
    question: string;
}
export class AnswerInfo {
    _id: number;
    text: string;
    value: number;
}