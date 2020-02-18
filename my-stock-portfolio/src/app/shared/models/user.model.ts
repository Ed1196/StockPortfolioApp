export class Stock {
    name ?: string
    price ?: number
    quantity ?: number
    open ?: number

}

export class Transaction {
    symbol ?: string
    quantity ?: number
    price ?: number
}

export class UserModel {
    firstname ?: string;
    lastname ?: string;
    email ?: string;
    password ?: string;
    stocks ?: Stock[];
    transactions ?: Transaction[];
    totalportfolio ?: string;
    account ?: number;
    
}