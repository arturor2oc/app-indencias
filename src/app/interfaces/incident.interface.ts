export interface Incident{
    _id?: string;
    title?: string;
    description?: string;
    user?: string;
    severity?: string;
    completed?: boolean;
    create_at?: Date;
}