export type UserType = {
    id?: string,
    first_name: string,
    second_name: string,
    createdAt: string,
    avatar: string,
    email: string
}

export type UserTypeApi = {
    first_name: string;
    second_name: string;
    email: string;
    avatar?: string | null;
}
