interface BalanceSerializer {
    balance: number
}

export function balanceSerializer(balance: number): BalanceSerializer {
    const serializer: BalanceSerializer = {balance}
    return serializer;
}