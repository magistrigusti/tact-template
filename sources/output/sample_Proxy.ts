import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type ProxyMessage = {
    $$type: 'ProxyMessage';
    str: string;
    to: Address;
}

export function storeProxyMessage(src: ProxyMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2376135367, 32);
        b_0.storeStringRefTail(src.str);
        b_0.storeAddress(src.to);
    };
}

export function loadProxyMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2376135367) { throw Error('Invalid prefix'); }
    let _str = sc_0.loadStringRefTail();
    let _to = sc_0.loadAddress();
    return { $$type: 'ProxyMessage' as const, str: _str, to: _to };
}

function loadTupleProxyMessage(source: TupleReader) {
    let _str = source.readString();
    let _to = source.readAddress();
    return { $$type: 'ProxyMessage' as const, str: _str, to: _to };
}

function storeTupleProxyMessage(source: ProxyMessage) {
    let builder = new TupleBuilder();
    builder.writeString(source.str);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserProxyMessage(): DictionaryValue<ProxyMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProxyMessage(src)).endCell());
        },
        parse: (src) => {
            return loadProxyMessage(src.loadRef().beginParse());
        }
    }
}

export type ChangeExampleOwner = {
    $$type: 'ChangeExampleOwner';
    address: Address;
}

export function storeChangeExampleOwner(src: ChangeExampleOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4284418577, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadChangeExampleOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4284418577) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'ChangeExampleOwner' as const, address: _address };
}

function loadTupleChangeExampleOwner(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'ChangeExampleOwner' as const, address: _address };
}

function storeTupleChangeExampleOwner(source: ChangeExampleOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserChangeExampleOwner(): DictionaryValue<ChangeExampleOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeExampleOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeExampleOwner(src.loadRef().beginParse());
        }
    }
}

export type LastMessage = {
    $$type: 'LastMessage';
    last_message: string | null;
    last_sender: Address | null;
    last_receiver: Address | null;
}

export function storeLastMessage(src: LastMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.last_message !== null && src.last_message !== undefined) { b_0.storeBit(true).storeStringRefTail(src.last_message); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.last_sender);
        b_0.storeAddress(src.last_receiver);
    };
}

export function loadLastMessage(slice: Slice) {
    let sc_0 = slice;
    let _last_message = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    let _last_sender = sc_0.loadMaybeAddress();
    let _last_receiver = sc_0.loadMaybeAddress();
    return { $$type: 'LastMessage' as const, last_message: _last_message, last_sender: _last_sender, last_receiver: _last_receiver };
}

function loadTupleLastMessage(source: TupleReader) {
    let _last_message = source.readStringOpt();
    let _last_sender = source.readAddressOpt();
    let _last_receiver = source.readAddressOpt();
    return { $$type: 'LastMessage' as const, last_message: _last_message, last_sender: _last_sender, last_receiver: _last_receiver };
}

function storeTupleLastMessage(source: LastMessage) {
    let builder = new TupleBuilder();
    builder.writeString(source.last_message);
    builder.writeAddress(source.last_sender);
    builder.writeAddress(source.last_receiver);
    return builder.build();
}

function dictValueParserLastMessage(): DictionaryValue<LastMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLastMessage(src)).endCell());
        },
        parse: (src) => {
            return loadLastMessage(src.loadRef().beginParse());
        }
    }
}

 type Proxy_init_args = {
    $$type: 'Proxy_init_args';
    owner: Address;
}

function initProxy_init_args(src: Proxy_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function Proxy_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECHAEABYkAART/APSkE/S88sgLAQIBYgIDA5rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCyPhDAcx/AcoAVUDbPMntVBMEBQIBIBESBPLtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQjaDyx7qP0DDTHwGCEI2g8se68uCB1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJwgEAj2zwjVSB/VTBtbds8+EFvJBAjXwMC2zx/4CCCEP9fChG6CwwNBgHOUFQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSgQEBzwAhbrObfwHKAMhYzxbJAcyUcDLKAOJYIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuLIWBACfo61MNMfAYIQ/18KEbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMVVA2zxsFH/gwACRMOMNcAgHBNwg+QEggvBWHbkZHNoZIvr2Bm7STtxoFms5ML/rWbp/yERxLniPdbqPoVvbPCAgbvLQgHCAQCUgbvLQgNs8f1UwbW3bPAOkA3/bMeCC8G70GhYDJ5y9AzltOjWT0/RlyWhVQSWos5Bn6/yLBg1luggLDAkAEvhCUlDHBfLghAN2jzAw+EFvJBAjXwMlgRFNAscF8vQgIG7y0IBwgEAlIG7y0IDbPH9VMG1t2zwDpAN/2zHgINdJwh/jAjALDAoDRoAg1yFwgEAi2zwoVSB/VTBtbds8+EFvJBAjXwNSYts8f9sxCwwNAULIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DEOAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AA8ADGwzA6RVIAC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAFggbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4skBzAIRviju2ebZ42KMExQCASAYGQJ+7UTQ1AH4Y9IAAY6E2zxsFeD4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0ds8FRYAAiQBvvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDSAAGT1AHQkW3iAfpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB1AHQFwAIcG1tbQBg+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4jEVFEMwALm7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnCdl05as07LczoOlm2UZuikgnBAznVp5xX50lCwHWFuJkeygCAUgaGwARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1QY3lwUXg1b3JYUWpBdEFOZ1FWbThlejZBMXI3WVpjZWRqRnJ3cEZMeHJuNIIA==');
    const __system = Cell.fromBase64('te6cckECHgEABZMAAQHAAQEFoMZ3AgEU/wD0pBP0vPLICwMCAWIMBAIBIAoFAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtUGN5cFF4NW9yWFFqQXRBTmdRVm04ZXo2QTFyN1laY2VkakZyd3BGTHhybjSCAAEbCvu1E0NIAAYAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJwQM51aecV+dJQsB1hbiZHsoAhG+KO7Z5tnjYowaCwACJAOa0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRTbPPLggsj4QwHMfwHKAFVA2zzJ7VQaDw0BzlBUINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEoEBAc8AIW6zm38BygDIWM8WyQHMlHAyygDiWCBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiyFgOAFggbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4skBzATy7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEI2g8se6j9Aw0x8BghCNoPLHuvLggdQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwScIBAI9s8I1Ugf1UwbW3bPPhBbyQQI18DAts8f+AgghD/XwoRuhgWFRACfo61MNMfAYIQ/18KEbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMVVA2zxsFH/gwACRMOMNcBQRBNwg+QEggvBWHbkZHNoZIvr2Bm7STtxoFms5ML/rWbp/yERxLniPdbqPoVvbPCAgbvLQgHCAQCUgbvLQgNs8f1UwbW3bPAOkA3/bMeCC8G70GhYDJ5y9AzltOjWT0/RlyWhVQSWos5Bn6/yLBg1luhQYFhIDdo8wMPhBbyQQI18DJYERTQLHBfL0ICBu8tCAcIBAJSBu8tCA2zx/VTBtbds8A6QDf9sx4CDXScIf4wIwGBYTA0aAINchcIBAIts8KFUgf1UwbW3bPPhBbyQQI18DUmLbPH/bMRgWFQAS+EJSUMcF8uCEAAxsMwOkVSAByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAFwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAFCyHAByx9vAAFvjG1vjAHbPG8iAcmTIW6zlgFvIlnMyegxGQC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DAn7tRNDUAfhj0gABjoTbPGwV4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHR2zwcGwAIcG1tbQG++kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANIAAZPUAdCRbeIB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gHUAdAdAGD6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iMRUUQzC5NQSw');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initProxy_init_args({ $$type: 'Proxy_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Proxy_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
}

const Proxy_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ProxyMessage","header":2376135367,"fields":[{"name":"str","type":{"kind":"simple","type":"string","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeExampleOwner","header":4284418577,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LastMessage","header":null,"fields":[{"name":"last_message","type":{"kind":"simple","type":"string","optional":true}},{"name":"last_sender","type":{"kind":"simple","type":"address","optional":true}},{"name":"last_receiver","type":{"kind":"simple","type":"address","optional":true}}]},
]

const Proxy_getters: ABIGetter[] = [
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Proxy_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"Repeat"}},
    {"receiver":"internal","message":{"kind":"text","text":"Return"}},
    {"receiver":"internal","message":{"kind":"text"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProxyMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeExampleOwner"}},
]

export class Proxy implements Contract {
    
    static async init(owner: Address) {
        return await Proxy_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await Proxy_init(owner);
        const address = contractAddress(0, init);
        return new Proxy(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Proxy(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Proxy_types,
        getters: Proxy_getters,
        receivers: Proxy_receivers,
        errors: Proxy_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Repeat' | 'Return' | string | ProxyMessage | ChangeExampleOwner) {
        
        let body: Cell | null = null;
        if (message === 'Repeat') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Return') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (typeof message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProxyMessage') {
            body = beginCell().store(storeProxyMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeExampleOwner') {
            body = beginCell().store(storeChangeExampleOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}