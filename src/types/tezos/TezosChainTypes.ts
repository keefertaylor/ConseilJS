/**
 * Types used to process data returned from the Tezos node.
 */

export interface BlockHeader {
    level: number,
    proto: number,
    predecessor: string,
    timestamp: string,
    validation_pass: number,
    operations_hash: string,
    fitness: string[],
    context: string,
    priority: number,
    proof_of_work_nonce: string,
    signature: string
}

export interface BlockMetadata {
    protocol: string,
    chain_id: string,
    hash: string,
    metadata: BlockHeader
}

export interface AccountDelegate {
    setable: boolean,
    value: string
}

export interface Account {
    manager: string,
    balance: number,
    spendable: boolean,
    delegate: AccountDelegate,
    script: string,
    counter: number
}

export interface ManagerKey {
    manager: string,
    key: string
}

export interface AlphaOperationResult {
    status: string,
    originated_contracts: string[]
    errors: string[]
}

export interface AlphaOperationContentsAndResult {
    kind: string,
    metadata: AlphaOperationResult
}

export interface AlphaOperationsWithMetadata {
    contents: AlphaOperationContentsAndResult[],
    signature: string,
    kind: string, //only if error
    id: string, //only if error
    contract: string //only if error
}

export interface InjectedOperation {
    injectedOperation: string
}

// abstracts Transaction, Delegation, Reveal, and Origination operations
export interface Operation {
    kind: string,
    source: string,
    fee: string,
    counter: string,
    storage_limit: string,
    gas_limit: string,
    delegate?: string,
    public_key?: string,
    managerPubkey?: string, // mainnet, alphanet
    //manager_pubkey?: string, // zeronet
    balance?: string,
    spendable?: boolean,
    delegatable?: boolean,
    destination?: string,
    amount?: string,
    script?: string | object,
    parameters?: string;
}

/**
 * This object does not match the RPC entity by the same name.
 */
export interface Ballot {
    source: string,
    period: number,
    proposal: string,
    vote: BallotVote
}

export interface ContractOriginationOperation extends Operation {
    script: string;
}

export interface ContractInvocationOperation extends Operation {
    parameters: string;
}

/**
 * Output of operation signing.
 */
export interface SignedOperationGroup {
    bytes: Buffer;
    signature: string;
}

/**
 * Result of a successfully sent operation
 */
export interface OperationResult {
    results: AlphaOperationsWithMetadata;
    operationGroupID: string;
}

export enum OperationKindType {
    SeedNonceRevelation = 'seed_nonce_revelation',
    Delegation = 'delegation',
    Transaction = 'transaction',
    AccountActivation = 'activate_account',
    Origination = 'origination',
    Reveal = 'reveal',
    Endorsement = "endorsement",
    Ballot = 'ballot'
}

export enum BallotVote {
    Yay = 0,
    Nay = 1,
    Pass = 2
}

/**
 * This object does not match the RPC entity by the same name.
 */
export interface Activation {
    pkh: string,
    secret: string
}