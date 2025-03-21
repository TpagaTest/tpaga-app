export type Transaction = {
    id: number;
    userId: number;
    amount: number;
    description: string;
    createdAt: string;
};

export type NewTransaction = {
    amount: number;
    description: string;
};

export type TransactionListType = {
    totalPages: number;
    page: number;
    data: Transaction[];
}