(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/definitions.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/essentials.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/hashers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable sort-keys */ __turbopack_context__.s([
    "AllHashers",
    ()=>AllHashers
]);
const AllHashers = {
    Blake2_128: null,
    Blake2_256: null,
    Blake2_128Concat: null,
    Twox128: null,
    Twox256: null,
    Twox64Concat: null,
    // new in v11
    Identity: null
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const META_V1_TO_V2 = {
    metadata: {
        description: 'Returns the metadata of a runtime',
        params: [],
        type: 'OpaqueMetadata'
    }
};
const runtime = {
    Metadata: [
        {
            methods: {
                metadata_at_version: {
                    description: 'Returns the metadata at a given version.',
                    params: [
                        {
                            name: 'version',
                            type: 'u32'
                        }
                    ],
                    type: 'Option<OpaqueMetadata>'
                },
                metadata_versions: {
                    description: 'Returns the supported metadata versions.',
                    params: [],
                    type: 'Vec<u32>'
                },
                ...META_V1_TO_V2
            },
            version: 2
        },
        {
            methods: {
                ...META_V1_TO_V2
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v9.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v9",
    ()=>v9
]);
const v9 = {
    // v9
    ErrorMetadataV9: {
        name: 'Text',
        docs: 'Vec<Text>'
    },
    EventMetadataV9: {
        name: 'Text',
        args: 'Vec<Type>',
        docs: 'Vec<Text>'
    },
    FunctionArgumentMetadataV9: {
        name: 'Text',
        type: 'Type'
    },
    FunctionMetadataV9: {
        name: 'Text',
        args: 'Vec<FunctionArgumentMetadataV9>',
        docs: 'Vec<Text>'
    },
    MetadataV9: {
        modules: 'Vec<ModuleMetadataV9>'
    },
    ModuleConstantMetadataV9: {
        name: 'Text',
        type: 'Type',
        value: 'Bytes',
        docs: 'Vec<Text>'
    },
    ModuleMetadataV9: {
        name: 'Text',
        storage: 'Option<StorageMetadataV9>',
        calls: 'Option<Vec<FunctionMetadataV9>>',
        events: 'Option<Vec<EventMetadataV9>>',
        constants: 'Vec<ModuleConstantMetadataV9>',
        errors: 'Vec<ErrorMetadataV9>'
    },
    StorageEntryMetadataV9: {
        name: 'Text',
        modifier: 'StorageEntryModifierV9',
        type: 'StorageEntryTypeV9',
        fallback: 'Bytes',
        docs: 'Vec<Text>'
    },
    StorageEntryModifierV9: {
        _enum: [
            'Optional',
            'Default',
            'Required'
        ]
    },
    StorageEntryTypeV9: {
        _enum: {
            Plain: 'Type',
            Map: {
                hasher: 'StorageHasherV9',
                key: 'Type',
                value: 'Type',
                linked: 'bool'
            },
            DoubleMap: {
                hasher: 'StorageHasherV9',
                key1: 'Type',
                key2: 'Type',
                value: 'Type',
                key2Hasher: 'StorageHasherV9'
            }
        }
    },
    StorageHasherV9: {
        _enum: {
            Blake2_128: null,
            Blake2_256: null,
            Twox128: null,
            Twox256: null,
            Twox64Concat: null
        }
    },
    StorageMetadataV9: {
        prefix: 'Text',
        items: 'Vec<StorageEntryMetadataV9>'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v10.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v10",
    ()=>v10
]);
const v10 = {
    // v10
    ErrorMetadataV10: 'ErrorMetadataV9',
    EventMetadataV10: 'EventMetadataV9',
    FunctionArgumentMetadataV10: 'FunctionArgumentMetadataV9',
    FunctionMetadataV10: 'FunctionMetadataV9',
    MetadataV10: {
        modules: 'Vec<ModuleMetadataV10>'
    },
    ModuleConstantMetadataV10: 'ModuleConstantMetadataV9',
    ModuleMetadataV10: {
        name: 'Text',
        storage: 'Option<StorageMetadataV10>',
        calls: 'Option<Vec<FunctionMetadataV10>>',
        events: 'Option<Vec<EventMetadataV10>>',
        constants: 'Vec<ModuleConstantMetadataV10>',
        errors: 'Vec<ErrorMetadataV10>'
    },
    StorageEntryModifierV10: 'StorageEntryModifierV9',
    StorageEntryMetadataV10: {
        name: 'Text',
        modifier: 'StorageEntryModifierV10',
        type: 'StorageEntryTypeV10',
        fallback: 'Bytes',
        docs: 'Vec<Text>'
    },
    StorageEntryTypeV10: {
        _enum: {
            Plain: 'Type',
            Map: {
                hasher: 'StorageHasherV10',
                key: 'Type',
                value: 'Type',
                linked: 'bool'
            },
            DoubleMap: {
                hasher: 'StorageHasherV10',
                key1: 'Type',
                key2: 'Type',
                value: 'Type',
                key2Hasher: 'StorageHasherV10'
            }
        }
    },
    StorageMetadataV10: {
        prefix: 'Text',
        items: 'Vec<StorageEntryMetadataV10>'
    },
    StorageHasherV10: {
        _enum: {
            Blake2_128: null,
            Blake2_256: null,
            Blake2_128Concat: null,
            Twox128: null,
            Twox256: null,
            Twox64Concat: null
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v11.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v11",
    ()=>v11
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$hashers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/hashers.js [app-client] (ecmascript)");
;
const v11 = {
    // v11
    ErrorMetadataV11: 'ErrorMetadataV10',
    EventMetadataV11: 'EventMetadataV10',
    ExtrinsicMetadataV11: {
        version: 'u8',
        signedExtensions: 'Vec<Text>'
    },
    FunctionArgumentMetadataV11: 'FunctionArgumentMetadataV10',
    FunctionMetadataV11: 'FunctionMetadataV10',
    MetadataV11: {
        modules: 'Vec<ModuleMetadataV11>',
        extrinsic: 'ExtrinsicMetadataV11'
    },
    ModuleConstantMetadataV11: 'ModuleConstantMetadataV10',
    ModuleMetadataV11: {
        name: 'Text',
        storage: 'Option<StorageMetadataV11>',
        calls: 'Option<Vec<FunctionMetadataV11>>',
        events: 'Option<Vec<EventMetadataV11>>',
        constants: 'Vec<ModuleConstantMetadataV11>',
        errors: 'Vec<ErrorMetadataV11>'
    },
    StorageEntryModifierV11: 'StorageEntryModifierV10',
    StorageEntryMetadataV11: {
        name: 'Text',
        modifier: 'StorageEntryModifierV11',
        type: 'StorageEntryTypeV11',
        fallback: 'Bytes',
        docs: 'Vec<Text>'
    },
    StorageEntryTypeV11: {
        _enum: {
            Plain: 'Type',
            Map: {
                hasher: 'StorageHasherV11',
                key: 'Type',
                value: 'Type',
                linked: 'bool'
            },
            DoubleMap: {
                hasher: 'StorageHasherV11',
                key1: 'Type',
                key2: 'Type',
                value: 'Type',
                key2Hasher: 'StorageHasherV11'
            }
        }
    },
    StorageMetadataV11: {
        prefix: 'Text',
        items: 'Vec<StorageEntryMetadataV11>'
    },
    StorageHasherV11: {
        _enum: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$hashers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AllHashers"]
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v12.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v12",
    ()=>v12
]);
const v12 = {
    // v12
    ErrorMetadataV12: 'ErrorMetadataV11',
    EventMetadataV12: 'EventMetadataV11',
    ExtrinsicMetadataV12: 'ExtrinsicMetadataV11',
    FunctionArgumentMetadataV12: 'FunctionArgumentMetadataV11',
    FunctionMetadataV12: 'FunctionMetadataV11',
    MetadataV12: {
        modules: 'Vec<ModuleMetadataV12>',
        extrinsic: 'ExtrinsicMetadataV12'
    },
    ModuleConstantMetadataV12: 'ModuleConstantMetadataV11',
    ModuleMetadataV12: {
        name: 'Text',
        storage: 'Option<StorageMetadataV12>',
        calls: 'Option<Vec<FunctionMetadataV12>>',
        events: 'Option<Vec<EventMetadataV12>>',
        constants: 'Vec<ModuleConstantMetadataV12>',
        errors: 'Vec<ErrorMetadataV12>',
        index: 'u8'
    },
    StorageEntryModifierV12: 'StorageEntryModifierV11',
    StorageEntryMetadataV12: 'StorageEntryMetadataV11',
    StorageEntryTypeV12: 'StorageEntryTypeV11',
    StorageMetadataV12: 'StorageMetadataV11',
    StorageHasherV12: 'StorageHasherV11'
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v13.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v13",
    ()=>v13
]);
const v13 = {
    // v13
    ErrorMetadataV13: 'ErrorMetadataV12',
    EventMetadataV13: 'EventMetadataV12',
    ExtrinsicMetadataV13: 'ExtrinsicMetadataV12',
    FunctionArgumentMetadataV13: 'FunctionArgumentMetadataV12',
    FunctionMetadataV13: 'FunctionMetadataV12',
    MetadataV13: {
        modules: 'Vec<ModuleMetadataV13>',
        extrinsic: 'ExtrinsicMetadataV13'
    },
    ModuleConstantMetadataV13: 'ModuleConstantMetadataV12',
    ModuleMetadataV13: {
        name: 'Text',
        storage: 'Option<StorageMetadataV13>',
        calls: 'Option<Vec<FunctionMetadataV13>>',
        events: 'Option<Vec<EventMetadataV13>>',
        constants: 'Vec<ModuleConstantMetadataV13>',
        errors: 'Vec<ErrorMetadataV13>',
        index: 'u8'
    },
    StorageEntryModifierV13: 'StorageEntryModifierV12',
    StorageEntryMetadataV13: {
        name: 'Text',
        modifier: 'StorageEntryModifierV13',
        type: 'StorageEntryTypeV13',
        fallback: 'Bytes',
        docs: 'Vec<Text>'
    },
    StorageEntryTypeV13: {
        _enum: {
            Plain: 'Type',
            Map: {
                hasher: 'StorageHasherV13',
                key: 'Type',
                value: 'Type',
                linked: 'bool'
            },
            DoubleMap: {
                hasher: 'StorageHasherV13',
                key1: 'Type',
                key2: 'Type',
                value: 'Type',
                key2Hasher: 'StorageHasherV13'
            },
            NMap: {
                keyVec: 'Vec<Type>',
                hashers: 'Vec<StorageHasherV13>',
                value: 'Type'
            }
        }
    },
    StorageMetadataV13: {
        prefix: 'Text',
        items: 'Vec<StorageEntryMetadataV13>'
    },
    StorageHasherV13: 'StorageHasherV12'
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/scaleInfo/v1.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable sort-keys */ __turbopack_context__.s([
    "Si1Variant",
    ()=>Si1Variant,
    "v1",
    ()=>v1
]);
const Si1Variant = {
    name: 'Text',
    fields: 'Vec<Si1Field>',
    index: 'u8',
    docs: 'Vec<Text>'
};
const v1 = {
    Si1Field: {
        name: 'Option<Text>',
        type: 'Si1LookupTypeId',
        typeName: 'Option<Text>',
        docs: 'Vec<Text>'
    },
    Si1LookupTypeId: 'Compact<u32>',
    Si1Path: 'Si0Path',
    Si1Type: {
        path: 'Si1Path',
        params: 'Vec<Si1TypeParameter>',
        def: 'Si1TypeDef',
        docs: 'Vec<Text>'
    },
    Si1TypeDef: {
        _enum: {
            Composite: 'Si1TypeDefComposite',
            Variant: 'Si1TypeDefVariant',
            Sequence: 'Si1TypeDefSequence',
            Array: 'Si1TypeDefArray',
            Tuple: 'Si1TypeDefTuple',
            Primitive: 'Si1TypeDefPrimitive',
            Compact: 'Si1TypeDefCompact',
            BitSequence: 'Si1TypeDefBitSequence',
            // NOTE: This is specific to the implementation for pre-v14 metadata
            // compatibility (always keep this as the last entry in the enum)
            HistoricMetaCompat: 'Type'
        }
    },
    Si1TypeDefArray: {
        len: 'u32',
        type: 'Si1LookupTypeId'
    },
    Si1TypeDefBitSequence: {
        bitStoreType: 'Si1LookupTypeId',
        bitOrderType: 'Si1LookupTypeId'
    },
    Si1TypeDefCompact: {
        type: 'Si1LookupTypeId'
    },
    Si1TypeDefComposite: {
        fields: 'Vec<Si1Field>'
    },
    Si1TypeDefPrimitive: 'Si0TypeDefPrimitive',
    Si1TypeDefSequence: {
        type: 'Si1LookupTypeId'
    },
    Si1TypeDefTuple: 'Vec<Si1LookupTypeId>',
    Si1TypeParameter: {
        name: 'Text',
        type: 'Option<Si1LookupTypeId>'
    },
    Si1TypeDefVariant: {
        variants: 'Vec<Si1Variant>'
    },
    Si1Variant
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v14.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v14",
    ()=>v14
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$scaleInfo$2f$v1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/scaleInfo/v1.js [app-client] (ecmascript)");
;
const v14 = {
    // registry
    PortableTypeV14: {
        id: 'Si1LookupTypeId',
        type: 'Si1Type'
    },
    // compatibility with earlier layouts, i.e. don't break previous users
    ErrorMetadataV14: {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$scaleInfo$2f$v1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Si1Variant"],
        args: 'Vec<Type>'
    },
    EventMetadataV14: {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$scaleInfo$2f$v1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Si1Variant"],
        args: 'Vec<Type>'
    },
    FunctionArgumentMetadataV14: {
        name: 'Text',
        type: 'Type',
        typeName: 'Option<Type>'
    },
    FunctionMetadataV14: {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$scaleInfo$2f$v1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Si1Variant"],
        args: 'Vec<FunctionArgumentMetadataV14>'
    },
    // V14
    ExtrinsicMetadataV14: {
        type: 'SiLookupTypeId',
        version: 'u8',
        signedExtensions: 'Vec<SignedExtensionMetadataV14>'
    },
    MetadataV14: {
        lookup: 'PortableRegistry',
        pallets: 'Vec<PalletMetadataV14>',
        extrinsic: 'ExtrinsicMetadataV14',
        type: 'SiLookupTypeId'
    },
    PalletCallMetadataV14: {
        type: 'SiLookupTypeId'
    },
    PalletConstantMetadataV14: {
        name: 'Text',
        type: 'SiLookupTypeId',
        value: 'Bytes',
        docs: 'Vec<Text>'
    },
    PalletErrorMetadataV14: {
        type: 'SiLookupTypeId'
    },
    PalletEventMetadataV14: {
        type: 'SiLookupTypeId'
    },
    PalletMetadataV14: {
        name: 'Text',
        storage: 'Option<PalletStorageMetadataV14>',
        calls: 'Option<PalletCallMetadataV14>',
        events: 'Option<PalletEventMetadataV14>',
        constants: 'Vec<PalletConstantMetadataV14>',
        errors: 'Option<PalletErrorMetadataV14>',
        index: 'u8'
    },
    PalletStorageMetadataV14: {
        prefix: 'Text',
        // NOTE: Renamed from entries
        items: 'Vec<StorageEntryMetadataV14>'
    },
    SignedExtensionMetadataV14: {
        identifier: 'Text',
        type: 'SiLookupTypeId',
        additionalSigned: 'SiLookupTypeId'
    },
    StorageEntryMetadataV14: {
        name: 'Text',
        modifier: 'StorageEntryModifierV14',
        type: 'StorageEntryTypeV14',
        fallback: 'Bytes',
        docs: 'Vec<Text>'
    },
    StorageEntryModifierV14: 'StorageEntryModifierV13',
    StorageEntryTypeV14: {
        _enum: {
            Plain: 'SiLookupTypeId',
            Map: {
                hashers: 'Vec<StorageHasherV14>',
                key: 'SiLookupTypeId',
                value: 'SiLookupTypeId'
            }
        }
    },
    StorageHasherV14: 'StorageHasherV13'
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v15.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v15",
    ()=>v15
]);
const v15 = {
    // new/adjusted in v15
    CustomMetadata15: {
        map: 'BTreeMap<Text, CustomValueMetadata15>'
    },
    CustomValueMetadata15: {
        type: 'SiLookupTypeId',
        value: 'Bytes'
    },
    ExtrinsicMetadataV15: {
        version: 'u8',
        addressType: 'SiLookupTypeId',
        callType: 'SiLookupTypeId',
        signatureType: 'SiLookupTypeId',
        extraType: 'SiLookupTypeId',
        signedExtensions: 'Vec<SignedExtensionMetadataV14>'
    },
    OuterEnums15: {
        callType: 'SiLookupTypeId',
        eventType: 'SiLookupTypeId',
        errorType: 'SiLookupTypeId'
    },
    PalletMetadataV15: {
        name: 'Text',
        storage: 'Option<PalletStorageMetadataV14>',
        calls: 'Option<PalletCallMetadataV14>',
        events: 'Option<PalletEventMetadataV14>',
        constants: 'Vec<PalletConstantMetadataV14>',
        errors: 'Option<PalletErrorMetadataV14>',
        index: 'u8',
        docs: 'Vec<Text>'
    },
    RuntimeApiMetadataV15: {
        name: 'Text',
        methods: 'Vec<RuntimeApiMethodMetadataV15>',
        docs: 'Vec<Text>'
    },
    RuntimeApiMethodMetadataV15: {
        name: 'Text',
        inputs: 'Vec<RuntimeApiMethodParamMetadataV15>',
        output: 'SiLookupTypeId',
        docs: 'Vec<Text>'
    },
    RuntimeApiMethodParamMetadataV15: {
        name: 'Text',
        type: 'SiLookupTypeId'
    },
    // actual v15 definition
    MetadataV15: {
        lookup: 'PortableRegistry',
        pallets: 'Vec<PalletMetadataV15>',
        extrinsic: 'ExtrinsicMetadataV15',
        type: 'SiLookupTypeId',
        apis: 'Vec<RuntimeApiMetadataV15>',
        outerEnums: 'OuterEnums15',
        custom: 'CustomMetadata15'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v16.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v16",
    ()=>v16
]);
const v16 = {
    // actual v16 definition
    MetadataV16: {
        lookup: 'PortableRegistry',
        pallets: 'Vec<PalletMetadataV16>',
        extrinsic: 'ExtrinsicMetadataV16',
        apis: 'Vec<RuntimeApiMetadataV16>',
        outerEnums: 'OuterEnums15',
        custom: 'CustomMetadata15'
    },
    // ---- Pallet definitions ----
    PalletMetadataV16: {
        name: 'Text',
        storage: 'Option<PalletStorageMetadataV16>',
        calls: 'Option<PalletCallMetadataV16>',
        events: 'Option<PalletEventMetadataV16>',
        constants: 'Vec<PalletConstantMetadataV16>',
        errors: 'Option<PalletErrorMetadataV16>',
        associatedTypes: 'Vec<PalletAssociatedTypeMetadataV16>',
        viewFunctions: 'Vec<PalletViewFunctionMetadataV16>',
        index: 'u8',
        docs: 'Vec<Text>',
        // Deprecation info
        deprecationInfo: 'ItemDeprecationInfoV16'
    },
    PalletStorageMetadataV16: {
        prefix: 'Text',
        items: 'Vec<StorageEntryMetadataV16>'
    },
    StorageEntryMetadataV16: {
        name: 'Text',
        modifier: 'StorageEntryModifierV14',
        type: 'StorageEntryTypeV14',
        fallback: 'Bytes',
        docs: 'Vec<Text>',
        deprecationInfo: 'ItemDeprecationInfoV16'
    },
    ItemDeprecationInfoV16: {
        _enum: {
            // Item is not deprecated.
            NotDeprecated: 'Null',
            // Item is fully deprecated without a note.
            DeprecatedWithoutNote: 'Null',
            // Item is fully deprecated with a note and an optional `since` field.
            Deprecated: {
                // Note explaining the deprecation
                note: 'Text',
                // Optional value for noting the version when the deprecation occurred.
                since: 'Option<Text>'
            }
        }
    },
    PalletCallMetadataV16: {
        type: 'SiLookupTypeId',
        // Deprecation status of the pallet call
        deprecationInfo: 'EnumDeprecationInfoV16'
    },
    // Deprecation information for enums in which specific variants can be deprecated.
    // If the map is empty, then nothing is deprecated.
    EnumDeprecationInfoV16: 'BTreeMap<u8, VariantDeprecationInfoV16>',
    VariantDeprecationInfoV16: {
        _enum: {
            // Dummy variant, just here to force DeprecatedWithoutNote
            // to have index 1 and Deprecated to have index 2
            DummyVariant: 'Null',
            // Variant is deprecated without a note.
            DeprecatedWithoutNote: 'Null',
            // Variant is deprecated with a note and an optional `since` field.
            Deprecated: {
                // Note explaining the deprecation
                note: 'Text',
                // Optional value for noting the version when the deprecation occurred.
                since: 'Option<Text>'
            }
        }
    },
    PalletEventMetadataV16: {
        type: 'SiLookupTypeId',
        // Deprecation info
        deprecationInfo: 'EnumDeprecationInfoV16'
    },
    PalletConstantMetadataV16: {
        name: 'Text',
        type: 'SiLookupTypeId',
        value: 'Bytes',
        docs: 'Vec<Text>',
        // Deprecation info
        deprecationInfo: 'ItemDeprecationInfoV16'
    },
    PalletErrorMetadataV16: {
        type: 'SiLookupTypeId',
        // Deprecation info
        deprecationInfo: 'EnumDeprecationInfoV16'
    },
    PalletAssociatedTypeMetadataV16: {
        name: 'Text',
        type: 'SiLookupTypeId',
        docs: 'Vec<Text>'
    },
    PalletViewFunctionMetadataV16: {
        id: '[u8; 32]',
        // Method name.
        name: 'Text',
        // Method par  ameters.
        inputs: 'Vec<RuntimeApiMethodParamMetadataV15>',
        // Method output.
        output: 'SiLookupTypeId',
        // Method documentation.
        docs: 'Vec<T::String>',
        // Deprecation info
        deprecationInfo: 'ItemDeprecationInfoV16'
    },
    // ---- Extrinsic definitions ----
    ExtrinsicMetadataV16: {
        // Extrinsic versions supported by the runtime.
        versions: 'Vec<u8>',
        // The type of the address that signs the extrinsic
        addressType: 'SiLookupTypeId',
        // The type of the outermost Call enum.
        callType: 'SiLookupTypeId',
        // The type of the extrinsic's signature.
        signatureType: 'SiLookupTypeId',
        // A mapping of supported transaction extrinsic versions to their respective transaction extension indexes.
        //
        // For each supported version number, list the indexes, in order, of the extensions used.
        transactionExtensionsByVersion: 'BTreeMap<u8, Vec<Compact<u32>>>',
        // The transaction extensions in the order they appear in the extrinsic.
        transactionExtensions: 'Vec<TransactionExtensionMetadataV16>'
    },
    TransactionExtensionMetadataV16: {
        // The unique transaction extension identifier, which may be different from the type name.
        identifier: 'Text',
        // The type of the transaction extension, with the data to be included in the extrinsic.
        type: 'SiLookupTypeId',
        // The type of the implicit data, with the data to be included in the signed payload.
        implicit: 'SiLookupTypeId'
    },
    // ---- Runtime Api definitions ----
    RuntimeApiMetadataV16: {
        name: 'Text',
        methods: 'Vec<RuntimeApiMethodMetadataV16>',
        docs: 'Vec<Text>',
        // Runtime API version.
        version: 'Compact<u32>',
        // Deprecation info
        deprecationInfo: 'ItemDeprecationInfoV16'
    },
    RuntimeApiMethodMetadataV16: {
        name: 'Text',
        inputs: 'Vec<RuntimeApiMethodParamMetadataV15>',
        output: 'SiLookupTypeId',
        docs: 'Vec<Text>',
        // Deprecation info
        deprecationInfo: 'ItemDeprecationInfoV16'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/definitions.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$hashers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/hashers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v9.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v10$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v10.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v11$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v11.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v12$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v12.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v13$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v13.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v14$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v14.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v15$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v15.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v16$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/v16.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        // all known
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v9"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v10$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v10"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v11$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v11"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v12$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v12"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v13$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v13"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v14$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v14"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v15$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v15"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$v16$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v16"],
        // latest mappings
        // NOTE: For v15, we only added the runtime defintions,
        // hence latest for most pointing to the previous V14
        ErrorMetadataLatest: 'ErrorMetadataV14',
        EventMetadataLatest: 'EventMetadataV14',
        ExtrinsicMetadataLatest: 'ExtrinsicMetadataV16',
        FunctionArgumentMetadataLatest: 'FunctionArgumentMetadataV14',
        FunctionMetadataLatest: 'FunctionMetadataV14',
        MetadataLatest: 'MetadataV16',
        PalletCallMetadataLatest: 'PalletCallMetadataV16',
        PalletConstantMetadataLatest: 'PalletConstantMetadataV16',
        PalletErrorMetadataLatest: 'PalletErrorMetadataV16',
        PalletEventMetadataLatest: 'PalletEventMetadataV16',
        PalletMetadataLatest: 'PalletMetadataV16',
        PalletStorageMetadataLatest: 'PalletStorageMetadataV16',
        PortableType: 'PortableTypeV14',
        RuntimeApiMetadataLatest: 'RuntimeApiMetadataV16',
        SignedExtensionMetadataLatest: 'SignedExtensionMetadataV14',
        TransactionExtensionMetadataLatest: 'TransactionExtensionMetadataV16',
        StorageEntryMetadataLatest: 'StorageEntryMetadataV16',
        StorageEntryModifierLatest: 'StorageEntryModifierV14',
        StorageEntryTypeLatest: 'StorageEntryTypeV14',
        StorageHasher: 'StorageHasherV14',
        // additional types
        OpaqueMetadata: 'Opaque<Bytes>',
        // the enum containing all the mappings
        MetadataAll: {
            _enum: {
                V0: 'DoNotConstruct<MetadataV0>',
                V1: 'DoNotConstruct<MetadataV1>',
                V2: 'DoNotConstruct<MetadataV2>',
                V3: 'DoNotConstruct<MetadataV3>',
                V4: 'DoNotConstruct<MetadataV4>',
                V5: 'DoNotConstruct<MetadataV5>',
                V6: 'DoNotConstruct<MetadataV6>',
                V7: 'DoNotConstruct<MetadataV7>',
                V8: 'DoNotConstruct<MetadataV8>',
                // First version on Kusama in V9, dropping will be problematic
                V9: 'MetadataV9',
                V10: 'MetadataV10',
                V11: 'MetadataV11',
                V12: 'MetadataV12',
                V13: 'MetadataV13',
                V14: 'MetadataV14',
                V15: 'MetadataV15',
                V16: 'MetadataV16'
            }
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/runtime/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const CORE_V1_TO_V4 = {
    execute_block: {
        description: 'Execute the given block.',
        params: [
            {
                name: 'block',
                type: 'Block'
            }
        ],
        type: 'Null'
    }
};
const CORE_V1_TO_V2 = {
    version: {
        description: 'Returns the version of the runtime.',
        params: [],
        type: 'RuntimeVersionPre3'
    }
};
const CORE_V2_TO_V4 = {
    initialize_block: {
        description: 'Initialize a block with the given header.',
        params: [
            {
                name: 'header',
                type: 'Header'
            }
        ],
        type: 'Null'
    }
};
const CORE_V4_VERSION = {
    version: {
        description: 'Returns the version of the runtime.',
        params: [],
        type: 'RuntimeVersion'
    }
};
const CORE_V4_TO_V5 = {
    ...CORE_V1_TO_V4,
    initialize_block: {
        description: 'Initialize a block with the given header.',
        params: [
            {
                name: 'header',
                type: 'Header'
            }
        ],
        type: 'ExtrinsicInclusionMode'
    }
};
const runtime = {
    Core: [
        {
            methods: {
                ...CORE_V4_VERSION,
                ...CORE_V4_TO_V5
            },
            version: 5
        },
        {
            methods: {
                ...CORE_V4_VERSION,
                ...CORE_V1_TO_V4,
                ...CORE_V2_TO_V4
            },
            version: 4
        },
        {
            methods: {
                version: {
                    description: 'Returns the version of the runtime.',
                    params: [],
                    type: 'RuntimeVersionPre4'
                },
                ...CORE_V1_TO_V4,
                ...CORE_V2_TO_V4
            },
            version: 3
        },
        {
            methods: {
                ...CORE_V1_TO_V2,
                ...CORE_V1_TO_V4,
                ...CORE_V2_TO_V4
            },
            version: 2
        },
        {
            methods: {
                initialise_block: {
                    description: 'Initialize a block with the given header.',
                    params: [
                        {
                            name: 'header',
                            type: 'Header'
                        }
                    ],
                    type: 'Null'
                },
                ...CORE_V1_TO_V2,
                ...CORE_V1_TO_V4
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/runtime/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "knownOrigins",
    ()=>knownOrigins
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$runtime$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/runtime/runtime.js [app-client] (ecmascript)");
;
const numberTypes = {
    Fixed64: 'Int<64, Fixed64>',
    FixedI64: 'Int<64, FixedI64>',
    FixedU64: 'UInt<64, FixedU64>',
    Fixed128: 'Int<128, Fixed128>',
    FixedI128: 'Int<128, FixedI128>',
    FixedU128: 'UInt<128, FixedU128>',
    I32F32: 'Int<64, I32F32>',
    U32F32: 'UInt<64, U32F32>',
    PerU16: 'UInt<16, PerU16>',
    Perbill: 'UInt<32, Perbill>',
    Percent: 'UInt<8, Percent>',
    Permill: 'UInt<32, Permill>',
    Perquintill: 'UInt<64, Perquintill>'
};
const knownOrigins = {
    //
    // (1) Defaults from Substrate
    //
    Council: 'CollectiveOrigin',
    System: 'SystemOrigin',
    TechnicalCommittee: 'CollectiveOrigin',
    //
    // (2) Defaults from Polkadot
    //
    Xcm: 'XcmOrigin',
    XcmPallet: 'XcmOrigin',
    //
    // (3) Defaults from Acala
    //
    Authority: 'AuthorityOrigin',
    GeneralCouncil: 'CollectiveOrigin'
};
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$runtime$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        ...numberTypes,
        AccountId: 'AccountId32',
        AccountId20: 'GenericEthereumAccountId',
        AccountId32: 'GenericAccountId32',
        AccountId33: 'GenericAccountId33',
        AccountIdOf: 'AccountId',
        AccountIndex: 'GenericAccountIndex',
        Address: 'MultiAddress',
        AssetId: 'u32',
        Balance: 'UInt<128, Balance>',
        BalanceOf: 'Balance',
        Block: 'GenericBlock',
        BlockNumber: 'u32',
        BlockNumberFor: 'BlockNumber',
        BlockNumberOf: 'BlockNumber',
        Call: 'GenericCall',
        CallHash: 'Hash',
        CallHashOf: 'CallHash',
        ChangesTrieConfiguration: {
            digestInterval: 'u32',
            digestLevels: 'u32'
        },
        ChangesTrieSignal: {
            _enum: {
                NewConfiguration: 'Option<ChangesTrieConfiguration>'
            }
        },
        ConsensusEngineId: 'GenericConsensusEngineId',
        CodecHash: 'Hash',
        CrateVersion: {
            major: 'u16',
            minor: 'u8',
            patch: 'u8'
        },
        Digest: {
            logs: 'Vec<DigestItem>'
        },
        DigestItem: {
            _enum: {
                Other: 'Bytes',
                AuthoritiesChange: 'Vec<AuthorityId>',
                ChangesTrieRoot: 'Hash',
                SealV0: 'SealV0',
                Consensus: 'Consensus',
                Seal: 'Seal',
                PreRuntime: 'PreRuntime',
                ChangesTrieSignal: 'ChangesTrieSignal',
                RuntimeEnvironmentUpdated: 'Null' // 8
            }
        },
        ExtrinsicsWeight: {
            normal: 'Weight',
            operational: 'Weight'
        },
        H32: '[u8; 4; H32]',
        H64: '[u8; 8; H64]',
        H128: '[u8; 16; H128]',
        H160: '[u8; 20; H160]',
        H256: '[u8; 32; H256]',
        H512: '[u8; 64; H512]',
        H1024: '[u8; 128; H1024]',
        H2048: '[u8; 256; H2048]',
        Hash: 'H256',
        Header: {
            parentHash: 'Hash',
            number: 'Compact<BlockNumber>',
            stateRoot: 'Hash',
            extrinsicsRoot: 'Hash',
            digest: 'Digest'
        },
        HeaderPartial: {
            parentHash: 'Hash',
            // since we only parse JSON with this, having non-compact works
            number: 'BlockNumber'
        },
        IndicesLookupSource: 'GenericLookupSource',
        Index: 'u32',
        Justification: '(ConsensusEngineId, EncodedJustification)',
        EncodedJustification: 'Bytes',
        Justifications: 'Vec<Justification>',
        KeyValue: '(StorageKey, StorageData)',
        KeyTypeId: 'u32',
        LockIdentifier: '[u8; 8]',
        LookupSource: 'MultiAddress',
        LookupTarget: 'AccountId',
        ModuleId: 'LockIdentifier',
        MultiAddress: 'GenericMultiAddress',
        MultiSigner: {
            _enum: {
                Ed25519: '[u8; 32]',
                Sr25519: '[u8; 32]',
                Ecdsa: '[u8; 33]'
            }
        },
        Moment: 'UInt<64, Moment>',
        OpaqueCall: 'Bytes',
        Origin: 'DoNotConstruct<Origin>',
        OriginCaller: {
            _enum: {
                // this should be dynamically built from the actual modules, based on index
                System: 'SystemOrigin'
            }
        },
        PalletId: 'LockIdentifier',
        PalletsOrigin: 'OriginCaller',
        PalletVersion: {
            major: 'u16',
            minor: 'u8',
            patch: 'u8'
        },
        Pays: {
            _enum: [
                'Yes',
                'No'
            ]
        },
        Phantom: 'Null',
        PhantomData: 'Null',
        Releases: {
            _enum: [
                'V1',
                'V2',
                'V3',
                'V4',
                'V5',
                'V6',
                'V7',
                'V8',
                'V9',
                'V10'
            ]
        },
        RuntimeCall: 'Call',
        RuntimeEvent: 'Event',
        RuntimeDbWeight: {
            read: 'Weight',
            write: 'Weight'
        },
        SignedBlock: 'SignedBlockWithJustifications',
        SignedBlockWithJustification: {
            block: 'Block',
            justification: 'Option<EncodedJustification>'
        },
        SignedBlockWithJustifications: {
            block: 'Block',
            justifications: 'Option<Justifications>'
        },
        Slot: 'u64',
        SlotDuration: 'u64',
        StorageData: 'Bytes',
        StorageInfo: {
            palletName: 'Bytes',
            storage_name: 'Bytes',
            prefix: 'Bytes',
            maxValues: 'Option<u32>',
            maxSize: 'Option<u32>'
        },
        StorageProof: {
            trieNodes: 'Vec<Bytes>'
        },
        TransactionPriority: 'u64',
        TransactionLongevity: 'u64',
        TransactionTag: 'Bytes',
        TransactionInfo: {
            _alias: {
                dataSize: 'size'
            },
            chunkRoot: 'H256',
            contentHash: 'H256',
            dataSize: 'u32',
            blockChunks: 'u32'
        },
        TransactionStorageProof: {
            chunk: 'Vec<u8>',
            proof: 'Vec<Vec<u8>>'
        },
        ValidatorId: 'AccountId',
        ValidatorIdOf: 'ValidatorId',
        WeightV0: 'u32',
        WeightV1: 'u64',
        WeightV2: {
            refTime: 'Compact<u64>',
            proofSize: 'Compact<u64>'
        },
        Weight: 'WeightV2',
        WeightMultiplier: 'Fixed64',
        // digest
        PreRuntime: '(ConsensusEngineId, Bytes)',
        SealV0: '(u64, Signature)',
        Seal: '(ConsensusEngineId, Bytes)',
        Consensus: '(ConsensusEngineId, Bytes)',
        // Type when core initialize_block went from v4 to v5
        ExtrinsicInclusionMode: {
            _enum: [
                'AllExtrinsics',
                'OnlyInherents'
            ]
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/scaleInfo/v0.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable sort-keys */ __turbopack_context__.s([
    "v0",
    ()=>v0
]);
const v0 = {
    Si0Field: {
        name: 'Option<Text>',
        type: 'Si0LookupTypeId',
        typeName: 'Option<Text>',
        docs: 'Vec<Text>'
    },
    Si0LookupTypeId: 'u32',
    Si0Path: 'Vec<Text>',
    Si0Type: {
        path: 'Si0Path',
        params: 'Vec<Si0LookupTypeId>',
        def: 'Si0TypeDef'
    },
    Si0TypeDef: {
        _enum: {
            Composite: 'Si0TypeDefComposite',
            Variant: 'Si0TypeDefVariant',
            Sequence: 'Si0TypeDefSequence',
            Array: 'Si0TypeDefArray',
            Tuple: 'Si0TypeDefTuple',
            Primitive: 'Si0TypeDefPrimitive',
            Compact: 'Si0TypeDefCompact',
            Phantom: 'Si0TypeDefPhantom',
            BitSequence: 'Si0TypeDefBitSequence'
        }
    },
    Si0TypeDefArray: {
        len: 'u32',
        type: 'Si0LookupTypeId'
    },
    Si0TypeDefBitSequence: {
        bitStoreType: 'Si0LookupTypeId',
        bitOrderType: 'Si0LookupTypeId'
    },
    Si0TypeDefCompact: {
        type: 'Si0LookupTypeId'
    },
    Si0TypeDefComposite: {
        fields: 'Vec<Si0Field>'
    },
    Si0TypeDefPhantom: 'Null',
    Si0TypeDefVariant: {
        variants: 'Vec<Si0Variant>'
    },
    Si0TypeDefPrimitive: {
        _enum: [
            'Bool',
            'Char',
            'Str',
            'U8',
            'U16',
            'U32',
            'U64',
            'U128',
            'U256',
            'I8',
            'I16',
            'I32',
            'I64',
            'I128',
            'I256'
        ]
    },
    Si0TypeDefSequence: {
        type: 'Si0LookupTypeId'
    },
    Si0TypeDefTuple: 'Vec<Si0LookupTypeId>',
    Si0TypeParameter: {
        name: 'Text',
        type: 'Option<Si0LookupTypeId>'
    },
    Si0Variant: {
        name: 'Text',
        fields: 'Vec<Si0Field>',
        index: 'Option<u8>',
        discriminant: 'Option<u64>',
        docs: 'Vec<Text>'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/scaleInfo/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$scaleInfo$2f$v0$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/scaleInfo/v0.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$scaleInfo$2f$v1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/scaleInfo/v1.js [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$scaleInfo$2f$v0$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v0"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$scaleInfo$2f$v1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v1"],
        // latest mappings
        SiField: 'Si1Field',
        SiLookupTypeId: 'Si1LookupTypeId',
        SiPath: 'Si1Path',
        SiType: 'Si1Type',
        SiTypeDef: 'Si1TypeDef',
        SiTypeDefArray: 'Si1TypeDefArray',
        SiTypeDefBitSequence: 'Si1TypeDefBitSequence',
        SiTypeDefCompact: 'Si1TypeDefCompact',
        SiTypeDefComposite: 'Si1TypeDefComposite',
        SiTypeDefPrimitive: 'Si1TypeDefPrimitive',
        SiTypeDefSequence: 'Si1TypeDefSequence',
        SiTypeDefTuple: 'Si1TypeDefTuple',
        SiTypeParameter: 'Si1TypeParameter',
        SiTypeDefVariant: 'Si1TypeDefVariant',
        SiVariant: 'Si1Variant'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/essentials.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "metadata",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
    "runtime",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$runtime$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "scaleInfo",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$scaleInfo$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$essentials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/essentials.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$metadata$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/metadata/definitions.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$runtime$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/runtime/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$scaleInfo$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/scaleInfo/definitions.js [app-client] (ecmascript)");
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/assetConversion/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    AssetConversionApi: [
        {
            methods: {
                get_reserves: {
                    description: 'Get pool reserves',
                    params: [
                        {
                            name: 'asset1',
                            type: 'StagingXcmV3MultiLocation'
                        },
                        {
                            name: 'asset2',
                            type: 'StagingXcmV3MultiLocation'
                        }
                    ],
                    type: 'Option<(Balance,Balance)>'
                },
                quote_price_exact_tokens_for_tokens: {
                    description: 'Quote price: exact tokens for tokens',
                    params: [
                        {
                            name: 'asset1',
                            type: 'StagingXcmV3MultiLocation'
                        },
                        {
                            name: 'asset2',
                            type: 'StagingXcmV3MultiLocation'
                        },
                        {
                            name: 'amount',
                            type: 'u128'
                        },
                        {
                            name: 'include_fee',
                            type: 'bool'
                        }
                    ],
                    type: 'Option<(Balance)>'
                },
                quote_price_tokens_for_exact_tokens: {
                    description: 'Quote price: tokens for exact tokens',
                    params: [
                        {
                            name: 'asset1',
                            type: 'StagingXcmV3MultiLocation'
                        },
                        {
                            name: 'asset2',
                            type: 'StagingXcmV3MultiLocation'
                        },
                        {
                            name: 'amount',
                            type: 'u128'
                        },
                        {
                            name: 'include_fee',
                            type: 'bool'
                        }
                    ],
                    type: 'Option<(Balance)>'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/assetConversion/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$assetConversion$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/assetConversion/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$assetConversion$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        TAssetConversion: 'Option<MultiLocation>'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/assets/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    AssetsApi: [
        {
            methods: {
                account_balances: {
                    description: 'Return the current set of authorities.',
                    params: [
                        {
                            name: 'account',
                            type: 'AccountId'
                        }
                    ],
                    type: 'Vec<(u32, TAssetBalance)>'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/assets/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$assets$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/assets/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$assets$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        AssetApprovalKey: {
            owner: 'AccountId',
            delegate: 'AccountId'
        },
        AssetApproval: {
            amount: 'TAssetBalance',
            deposit: 'TAssetDepositBalance'
        },
        AssetBalance: {
            balance: 'TAssetBalance',
            isFrozen: 'bool',
            isSufficient: 'bool'
        },
        AssetDestroyWitness: {
            accounts: 'Compact<u32>',
            sufficients: 'Compact<u32>',
            approvals: 'Compact<u32>'
        },
        AssetDetails: {
            owner: 'AccountId',
            issuer: 'AccountId',
            admin: 'AccountId',
            freezer: 'AccountId',
            supply: 'TAssetBalance',
            deposit: 'TAssetDepositBalance',
            minBalance: 'TAssetBalance',
            isSufficient: 'bool',
            accounts: 'u32',
            sufficients: 'u32',
            approvals: 'u32',
            isFrozen: 'bool'
        },
        AssetMetadata: {
            deposit: 'TAssetDepositBalance',
            name: 'Vec<u8>',
            symbol: 'Vec<u8>',
            decimals: 'u8',
            isFrozen: 'bool'
        },
        TAssetBalance: 'u64',
        TAssetDepositBalance: 'BalanceOf'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/aura/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    AuraApi: [
        {
            methods: {
                authorities: {
                    description: 'Return the current set of authorities.',
                    params: [],
                    type: 'Vec<AuthorityId>'
                },
                slot_duration: {
                    description: 'Returns the slot duration for Aura.',
                    params: [],
                    type: 'SlotDuration'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/aura/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$aura$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/aura/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$aura$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        RawAuraPreDigest: {
            slotNumber: 'u64'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/authorship/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        UncleEntryItem: {
            _enum: {
                InclusionHeight: 'BlockNumber',
                Uncle: '(Hash, Option<AccountId>)'
            }
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/babe/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    epochAuthorship: {
        description: 'Returns data about which slots (primary or secondary) can be claimed in the current epoch with the keys in the keystore',
        isUnsafe: true,
        params: [],
        type: 'HashMap<AuthorityId, EpochAuthorship>'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/babe/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const V1_V2_SHARED = {
    current_epoch: {
        description: 'Returns information regarding the current epoch.',
        params: [],
        type: 'Epoch'
    },
    current_epoch_start: {
        description: 'Returns the slot that started the current epoch.',
        params: [],
        type: 'Slot'
    },
    generate_key_ownership_proof: {
        description: 'Generates a proof of key ownership for the given authority in the current epoch.',
        params: [
            {
                name: 'slot',
                type: 'Slot'
            },
            {
                name: 'authorityId',
                type: 'AuthorityId'
            }
        ],
        type: 'Option<OpaqueKeyOwnershipProof>'
    },
    next_epoch: {
        description: 'Returns information regarding the next epoch (which was already previously announced).',
        params: [],
        type: 'Epoch'
    },
    submit_report_equivocation_unsigned_extrinsic: {
        description: 'Submits an unsigned extrinsic to report an equivocation.',
        params: [
            {
                name: 'equivocationProof',
                type: 'BabeEquivocationProof'
            },
            {
                name: 'keyOwnerProof',
                type: 'OpaqueKeyOwnershipProof'
            }
        ],
        type: 'Option<Null>'
    }
};
const runtime = {
    BabeApi: [
        {
            methods: {
                configuration: {
                    description: 'Return the genesis configuration for BABE. The configuration is only read on genesis.',
                    params: [],
                    type: 'BabeGenesisConfiguration'
                },
                ...V1_V2_SHARED
            },
            version: 2
        },
        {
            methods: {
                configuration: {
                    description: 'Return the configuration for BABE. Version 1.',
                    params: [],
                    type: 'BabeGenesisConfigurationV1'
                },
                ...V1_V2_SHARED
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/babe/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$babe$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/babe/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$babe$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/babe/runtime.js [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$babe$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$babe$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        AllowedSlots: {
            _enum: [
                'PrimarySlots',
                'PrimaryAndSecondaryPlainSlots',
                'PrimaryAndSecondaryVRFSlots'
            ]
        },
        BabeAuthorityWeight: 'u64',
        BabeEpochConfiguration: {
            c: '(u64, u64)',
            allowedSlots: 'AllowedSlots'
        },
        BabeBlockWeight: 'u32',
        BabeEquivocationProof: {
            offender: 'AuthorityId',
            slotNumber: 'SlotNumber',
            firstHeader: 'Header',
            secondHeader: 'Header'
        },
        BabeGenesisConfiguration: {
            slotDuration: 'u64',
            epochLength: 'u64',
            c: '(u64, u64)',
            genesisAuthorities: 'Vec<(AuthorityId, BabeAuthorityWeight)>',
            randomness: 'Randomness',
            allowedSlots: 'AllowedSlots'
        },
        BabeGenesisConfigurationV1: {
            slotDuration: 'u64',
            epochLength: 'u64',
            c: '(u64, u64)',
            genesisAuthorities: 'Vec<(AuthorityId, BabeAuthorityWeight)>',
            randomness: 'Randomness',
            secondarySlots: 'bool'
        },
        BabeWeight: 'u64',
        MaybeRandomness: 'Option<Randomness>',
        MaybeVrf: 'Option<VrfData>',
        Epoch: {
            epochIndex: 'u64',
            startSlot: 'Slot',
            duration: 'u64',
            authorities: 'Vec<(AuthorityId, BabeAuthorityWeight)>',
            randomness: 'Hash',
            config: 'BabeEpochConfiguration'
        },
        EpochAuthorship: {
            primary: 'Vec<u64>',
            secondary: 'Vec<u64>',
            secondary_vrf: 'Vec<u64>'
        },
        NextConfigDescriptor: {
            _enum: {
                V0: 'Null',
                V1: 'NextConfigDescriptorV1'
            }
        },
        NextConfigDescriptorV1: {
            c: '(u64, u64)',
            allowedSlots: 'AllowedSlots'
        },
        OpaqueKeyOwnershipProof: 'Bytes',
        Randomness: 'Hash',
        RawBabePreDigest: {
            _enum: {
                Phantom: 'Null',
                Primary: 'RawBabePreDigestPrimary',
                SecondaryPlain: 'RawBabePreDigestSecondaryPlain',
                SecondaryVRF: 'RawBabePreDigestSecondaryVRF'
            }
        },
        RawBabePreDigestPrimary: {
            authorityIndex: 'u32',
            slotNumber: 'SlotNumber',
            vrfOutput: 'VrfOutput',
            vrfProof: 'VrfProof'
        },
        RawBabePreDigestSecondaryPlain: {
            authorityIndex: 'u32',
            slotNumber: 'SlotNumber'
        },
        RawBabePreDigestSecondaryVRF: {
            authorityIndex: 'u32',
            slotNumber: 'SlotNumber',
            vrfOutput: 'VrfOutput',
            vrfProof: 'VrfProof'
        },
        RawBabePreDigestTo159: {
            _enum: {
                Primary: 'RawBabePreDigestPrimaryTo159',
                Secondary: 'RawBabePreDigestSecondaryTo159'
            }
        },
        RawBabePreDigestPrimaryTo159: {
            authorityIndex: 'u32',
            slotNumber: 'SlotNumber',
            weight: 'BabeBlockWeight',
            vrfOutput: 'VrfOutput',
            vrfProof: 'VrfProof'
        },
        RawBabePreDigestSecondaryTo159: {
            authorityIndex: 'u32',
            slotNumber: 'SlotNumber',
            weight: 'BabeBlockWeight'
        },
        // a cross old/new compatible version of the digest, that is _only_ useful
        // for partial parsing and extraction of the author. This assumes that all
        // entries has the authorityIndex in the first position - and that it is all
        // we are interested in
        RawBabePreDigestCompat: {
            _enum: {
                Zero: 'u32',
                One: 'u32',
                Two: 'u32',
                Three: 'u32'
            }
        },
        SlotNumber: 'u64',
        VrfData: '[u8; 32]',
        VrfOutput: '[u8; 32]',
        VrfProof: '[u8; 64]'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/balances/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        AccountData: {
            free: 'Balance',
            reserved: 'Balance',
            miscFrozen: 'Balance',
            feeFrozen: 'Balance'
        },
        BalanceLockTo212: {
            id: 'LockIdentifier',
            amount: 'Balance',
            until: 'BlockNumber',
            reasons: 'WithdrawReasons'
        },
        BalanceLock: {
            id: 'LockIdentifier',
            amount: 'Balance',
            reasons: 'Reasons'
        },
        BalanceStatus: {
            _enum: [
                'Free',
                'Reserved'
            ]
        },
        Reasons: {
            _enum: [
                'Fee',
                'Misc',
                'All'
            ]
        },
        ReserveData: {
            id: 'ReserveIdentifier',
            amount: 'Balance'
        },
        ReserveIdentifier: '[u8; 8]',
        VestingSchedule: {
            offset: 'Balance',
            perBlock: 'Balance',
            startingBlock: 'BlockNumber'
        },
        WithdrawReasons: {
            _set: {
                TransactionPayment: 0b0000_0001,
                Transfer: 0b0000_0010,
                Reserve: 0b0000_0100,
                Fee: 0b0000_1000,
                Tip: 0b0001_0000
            }
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/beefy/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    getFinalizedHead: {
        description: 'Returns hash of the latest BEEFY finalized block as seen by this client.',
        params: [],
        type: 'H256'
    },
    subscribeJustifications: {
        description: 'Returns the block most recently finalized by BEEFY, alongside its justification.',
        params: [],
        pubsub: [
            'justifications',
            'subscribeJustifications',
            'unsubscribeJustifications'
        ],
        type: 'BeefyVersionedFinalityProof'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/beefy/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const BEEFY_V3 = {
    beefy_genesis: {
        description: 'Return the block number where BEEFY consensus is enabled/started',
        params: [],
        type: 'Option<BlockNumber>'
    },
    generate_key_ownership_proof: {
        description: 'Generates a proof of key ownership for the given authority in the given set.',
        params: [
            {
                name: 'setId',
                type: 'ValidatorSetId'
            },
            {
                name: 'authorityId',
                type: 'AuthorityId'
            }
        ],
        type: 'Option<OpaqueKeyOwnershipProof>'
    },
    validator_set: {
        description: 'Return the current active BEEFY validator set',
        params: [],
        type: 'Option<ValidatorSet>'
    }
};
const BEEFY_V1_V3 = {
    ...BEEFY_V3,
    submit_report_equivocation_unsigned_extrinsic: {
        description: 'Submits an unsigned extrinsic to report an equivocation.',
        params: [
            {
                name: 'equivocationProof',
                type: 'BeefyEquivocationProof'
            },
            {
                name: 'keyOwnerProof',
                type: 'OpaqueKeyOwnershipProof'
            }
        ],
        type: 'Option<Null>'
    }
};
const BEEFY_V4 = {
    ...BEEFY_V3,
    submit_report_double_voting_unsigned_extrinsic: {
        description: 'Submits an unsigned extrinsic to report a double voting equivocation.',
        params: [
            {
                name: 'equivocationProof',
                type: 'SpConsensusBeefyDoubleVotingProof'
            },
            {
                name: 'keyOwnerProof',
                type: 'OpaqueKeyOwnershipProof'
            }
        ],
        type: 'Option<Null>'
    }
};
const BEEFY_MMR_V1 = {
    authority_set_proof: {
        description: 'Return the currently active BEEFY authority set proof.',
        params: [],
        type: 'BeefyAuthoritySet'
    },
    next_authority_set_proof: {
        description: 'Return the next/queued BEEFY authority set proof.',
        params: [],
        type: 'BeefyNextAuthoritySet'
    }
};
const runtime = {
    BeefyApi: [
        {
            methods: BEEFY_V4,
            version: 4
        },
        {
            methods: BEEFY_V1_V3,
            version: 3
        },
        {
            methods: BEEFY_V1_V3,
            version: 2
        },
        {
            methods: BEEFY_V1_V3,
            version: 1
        }
    ],
    BeefyMmrApi: [
        {
            methods: BEEFY_MMR_V1,
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/beefy/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$beefy$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/beefy/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$beefy$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/beefy/runtime.js [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$beefy$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$beefy$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        BeefyAuthoritySet: {
            id: 'u64',
            len: 'u32',
            root: 'H256'
        },
        BeefyCommitment: {
            payload: 'BeefyPayload',
            blockNumber: 'BlockNumber',
            validatorSetId: 'ValidatorSetId'
        },
        BeefyId: '[u8; 33]',
        BeefyEquivocationProof: {
            first: 'BeefyVoteMessage',
            second: 'BeefyVoteMessage'
        },
        BeefyCompactSignedCommitment: {
            commitment: 'BeefyCommitment',
            signaturesFrom: 'Vec<u8>',
            validatorSetLen: 'u32',
            signaturesCompact: 'Vec<EcdsaSignature>'
        },
        BeefySignedCommitment: {
            commitment: 'BeefyCommitment',
            signatures: 'Vec<Option<EcdsaSignature>>'
        },
        BeefyVersionedFinalityProof: {
            _enum: {
                V0: 'Null',
                V1: 'BeefyCompactSignedCommitment'
            }
        },
        BeefyNextAuthoritySet: {
            id: 'u64',
            len: 'u32',
            root: 'H256'
        },
        BeefyPayload: 'Vec<(BeefyPayloadId, Bytes)>',
        BeefyPayloadId: '[u8;2]',
        BeefyVoteMessage: {
            commitment: 'BeefyCommitment',
            id: 'AuthorityId',
            signature: 'Signature'
        },
        MmrRootHash: 'H256',
        ValidatorSetId: 'u64',
        ValidatorSet: {
            validators: 'Vec<AuthorityId>',
            id: 'ValidatorSetId'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/benchmark/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    Benchmark: [
        {
            methods: {
                benchmark_metadata: {
                    description: 'Get the benchmark metadata available for this runtime.',
                    params: [
                        {
                            name: 'extra',
                            type: 'bool'
                        }
                    ],
                    type: '(Vec<BenchmarkList>, Vec<StorageInfo>)'
                },
                dispatch_benchmark: {
                    description: 'Dispatch the given benchmark.',
                    params: [
                        {
                            name: 'config',
                            type: 'BenchmarkConfig'
                        }
                    ],
                    type: 'Result<Vec<BenchmarkBatch>, Text>'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/benchmark/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$benchmark$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/benchmark/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$benchmark$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        BenchmarkBatch: {
            pallet: 'Text',
            instance: 'Text',
            benchmark: 'Text',
            results: 'Vec<BenchmarkResult>'
        },
        BenchmarkConfig: {
            pallet: 'Bytes',
            benchmark: 'Bytes',
            selectedComponents: 'Vec<(BenchmarkParameter, u32)>',
            verify: 'bool',
            internalRepeats: 'u32'
        },
        BenchmarkList: {
            pallet: 'Bytes',
            instance: 'Bytes',
            benchmarks: 'Vec<BenchmarkMetadata>'
        },
        BenchmarkMetadata: {
            name: 'Bytes',
            components: 'Vec<(BenchmarkParameter, u32, u32)>'
        },
        BenchmarkParameter: {
            _enum: [
                'a',
                'b',
                'c',
                'd',
                'e',
                'f',
                'g',
                'h',
                'i',
                'j',
                'k',
                'l',
                'm',
                'n',
                'o',
                'p',
                'q',
                'r',
                's',
                't',
                'u',
                'v',
                'w',
                'x',
                'y',
                'z'
            ]
        },
        BenchmarkResult: {
            components: 'Vec<(BenchmarkParameter, u32)>',
            extrinsicTime: 'u128',
            storageRootTime: 'u128',
            reads: 'u32',
            repeatReads: 'u32',
            writes: 'u32',
            repeatWrites: 'u32',
            proofSize: 'u32',
            benchKeys: 'Vec<(Vec<u8>, u32, u32, bool)>'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/blockbuilder/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const BB_V2_TO_V4 = {
    // this was removed after V4
    random_seed: {
        description: 'Generate a random seed.',
        params: [],
        type: 'Hash'
    }
};
const BB_V2_TO_V5 = {
    apply_extrinsic: {
        description: 'Apply the given extrinsic.',
        params: [
            {
                name: 'extrinsic',
                type: 'Extrinsic'
            }
        ],
        type: 'ApplyExtrinsicResultPre6'
    }
};
const BB_V2_TO_V6 = {
    check_inherents: {
        description: 'Check that the inherents are valid.',
        params: [
            {
                name: 'block',
                type: 'Block'
            },
            {
                name: 'data',
                type: 'InherentData'
            }
        ],
        type: 'CheckInherentsResult'
    },
    inherent_extrinsics: {
        description: 'Generate inherent extrinsics.',
        params: [
            {
                name: 'inherent',
                type: 'InherentData'
            }
        ],
        type: 'Vec<Extrinsic>'
    }
};
const BB_V3_TO_V6 = {
    // renamed in v3 from finalize_block
    finalize_block: {
        description: 'Finish the current block.',
        params: [],
        type: 'Header'
    }
};
const runtime = {
    BlockBuilder: [
        {
            methods: {
                apply_extrinsic: {
                    description: 'Apply the given extrinsic.',
                    params: [
                        {
                            name: 'extrinsic',
                            type: 'Extrinsic'
                        }
                    ],
                    type: 'ApplyExtrinsicResult'
                },
                ...BB_V2_TO_V6,
                ...BB_V3_TO_V6
            },
            version: 6
        },
        {
            methods: {
                // apply_extrinsic result changed in 6
                ...BB_V2_TO_V5,
                ...BB_V2_TO_V6,
                ...BB_V3_TO_V6
            },
            version: 5
        },
        {
            methods: {
                // random_seed removed
                ...BB_V2_TO_V4,
                ...BB_V2_TO_V5,
                ...BB_V2_TO_V6,
                ...BB_V3_TO_V6
            },
            version: 4
        },
        {
            methods: {
                // finalize_block renamed
                ...BB_V2_TO_V4,
                ...BB_V2_TO_V6,
                ...BB_V3_TO_V6
            },
            version: 3
        },
        {
            methods: {
                finalise_block: {
                    description: 'Finish the current block.',
                    params: [],
                    type: 'Header'
                },
                ...BB_V2_TO_V4,
                ...BB_V2_TO_V6
            },
            version: 2
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/blockbuilder/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$blockbuilder$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/blockbuilder/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$blockbuilder$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        CheckInherentsResult: {
            okay: 'bool',
            fatalError: 'bool',
            errors: 'InherentData'
        },
        InherentData: {
            data: 'BTreeMap<InherentIdentifier, Bytes>'
        },
        InherentIdentifier: '[u8; 8]'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/collective/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        CollectiveOrigin: {
            _enum: {
                Members: '(MemberCount, MemberCount)',
                Member: 'AccountId'
            }
        },
        MemberCount: 'u32',
        ProposalIndex: 'u32',
        VotesTo230: {
            index: 'ProposalIndex',
            threshold: 'MemberCount',
            ayes: 'Vec<AccountId>',
            nays: 'Vec<AccountId>'
        },
        Votes: {
            index: 'ProposalIndex',
            threshold: 'MemberCount',
            ayes: 'Vec<AccountId>',
            nays: 'Vec<AccountId>',
            end: 'BlockNumber'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/consensus/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        AuthorityId: 'AccountId',
        RawVRFOutput: '[u8; 32]'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/contracts/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    call: {
        deprecated: 'Use the runtime interface `api.call.contractsApi.call` instead',
        description: 'Executes a call to a contract',
        params: [
            {
                name: 'callRequest',
                type: 'ContractCallRequest'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'ContractExecResult'
    },
    getStorage: {
        deprecated: 'Use the runtime interface `api.call.contractsApi.getStorage` instead',
        description: 'Returns the value under a specified storage key in a contract',
        params: [
            {
                name: 'address',
                type: 'AccountId'
            },
            {
                name: 'key',
                type: 'H256'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'Option<Bytes>'
    },
    instantiate: {
        deprecated: 'Use the runtime interface `api.call.contractsApi.instantiate` instead',
        description: 'Instantiate a new contract',
        params: [
            {
                name: 'request',
                type: 'InstantiateRequestV1'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'ContractInstantiateResult'
    },
    rentProjection: {
        deprecated: 'Not available in newer versions of the contracts interfaces',
        description: 'Returns the projected time a given contract will be able to sustain paying its rent',
        params: [
            {
                name: 'address',
                type: 'AccountId'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'Option<BlockNumber>'
    },
    uploadCode: {
        deprecated: 'Use the runtime interface `api.call.contractsApi.uploadCode` instead',
        description: 'Upload new code without instantiating a contract from it',
        // The RPC here is terribly misnamed - somebody forgot how the RPCs
        // are actually done, ie. <module>_<camelCasedMethod>
        endpoint: 'contracts_upload_code',
        params: [
            {
                name: 'uploadRequest',
                type: 'CodeUploadRequest'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'CodeUploadResult'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/contracts/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const SHARED_V1_V2 = {
    get_storage: {
        description: 'Query a given storage key in a given contract.',
        params: [
            {
                name: 'address',
                type: 'AccountId'
            },
            {
                name: 'key',
                type: 'Bytes'
            }
        ],
        type: 'Option<Bytes>'
    },
    upload_code: {
        description: 'Upload new code without instantiating a contract from it.',
        params: [
            {
                name: 'origin',
                type: 'AccountId'
            },
            {
                name: 'code',
                type: 'Bytes'
            },
            {
                name: 'storageDepositLimit',
                type: 'Option<Balance>'
            }
        ],
        type: 'CodeUploadResult'
    }
};
const runtime = {
    ContractsApi: [
        {
            methods: {
                call: {
                    description: 'Perform a call from a specified account to a given contract.',
                    params: [
                        {
                            name: 'origin',
                            type: 'AccountId'
                        },
                        {
                            name: 'dest',
                            type: 'AccountId'
                        },
                        {
                            name: 'value',
                            type: 'Balance'
                        },
                        {
                            name: 'gasLimit',
                            type: 'Option<WeightV2>'
                        },
                        {
                            name: 'storageDepositLimit',
                            type: 'Option<Balance>'
                        },
                        {
                            name: 'inputData',
                            type: 'Vec<u8>'
                        }
                    ],
                    type: 'ContractExecResult'
                },
                instantiate: {
                    description: 'Instantiate a new contract.',
                    params: [
                        {
                            name: 'origin',
                            type: 'AccountId'
                        },
                        {
                            name: 'value',
                            type: 'Balance'
                        },
                        {
                            name: 'gasLimit',
                            type: 'Option<WeightV2>'
                        },
                        {
                            name: 'storageDepositLimit',
                            type: 'Option<Balance>'
                        },
                        {
                            name: 'code',
                            type: 'CodeSource'
                        },
                        {
                            name: 'data',
                            type: 'Bytes'
                        },
                        {
                            name: 'salt',
                            type: 'Bytes'
                        }
                    ],
                    type: 'ContractInstantiateResult'
                },
                ...SHARED_V1_V2
            },
            version: 2
        },
        {
            methods: {
                call: {
                    description: 'Perform a call from a specified account to a given contract.',
                    params: [
                        {
                            name: 'origin',
                            type: 'AccountId'
                        },
                        {
                            name: 'dest',
                            type: 'AccountId'
                        },
                        {
                            name: 'value',
                            type: 'Balance'
                        },
                        {
                            name: 'gasLimit',
                            type: 'u64'
                        },
                        {
                            name: 'storageDepositLimit',
                            type: 'Option<Balance>'
                        },
                        {
                            name: 'inputData',
                            type: 'Vec<u8>'
                        }
                    ],
                    type: 'ContractExecResultU64'
                },
                instantiate: {
                    description: 'Instantiate a new contract.',
                    params: [
                        {
                            name: 'origin',
                            type: 'AccountId'
                        },
                        {
                            name: 'value',
                            type: 'Balance'
                        },
                        {
                            name: 'gasLimit',
                            type: 'u64'
                        },
                        {
                            name: 'storageDepositLimit',
                            type: 'Option<Balance>'
                        },
                        {
                            name: 'code',
                            type: 'CodeSource'
                        },
                        {
                            name: 'data',
                            type: 'Bytes'
                        },
                        {
                            name: 'salt',
                            type: 'Bytes'
                        }
                    ],
                    type: 'ContractInstantiateResultU64'
                },
                ...SHARED_V1_V2
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/contracts/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$contracts$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/contracts/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$contracts$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/contracts/runtime.js [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$contracts$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$contracts$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        AliveContractInfo: {
            trieId: 'TrieId',
            storageSize: 'u32',
            pairCount: 'u32',
            codeHash: 'CodeHash',
            rentAllowance: 'Balance',
            rentPaid: 'Balance',
            deductBlock: 'BlockNumber',
            lastWrite: 'Option<BlockNumber>',
            _reserved: 'Option<Null>'
        },
        CodeHash: 'Hash',
        CodeSource: {
            _enum: {
                Upload: 'Bytes',
                Existing: 'Hash'
            }
        },
        CodeUploadRequest: {
            origin: 'AccountId',
            code: 'Bytes',
            storageDepositLimit: 'Option<Balance>'
        },
        CodeUploadResult: 'Result<CodeUploadResultValue, DispatchError>',
        CodeUploadResultValue: {
            codeHash: 'CodeHash',
            deposit: 'Balance'
        },
        ContractCallRequest: {
            origin: 'AccountId',
            dest: 'AccountId',
            value: 'Balance',
            gasLimit: 'u64',
            storageDepositLimit: 'Option<Balance>',
            inputData: 'Bytes'
        },
        ContractExecResultSuccessTo255: {
            status: 'u8',
            data: 'Raw'
        },
        ContractExecResultTo255: {
            _enum: {
                Success: 'ContractExecResultSuccessTo255',
                Error: 'Null'
            }
        },
        ContractExecResultSuccessTo260: {
            flags: 'ContractReturnFlags',
            data: 'Bytes',
            gasConsumed: 'u64'
        },
        ContractExecResultTo260: {
            _enum: {
                Success: 'ContractExecResultSuccessTo260',
                Error: 'Null'
            }
        },
        ContractExecResultOk: {
            flags: 'ContractReturnFlags',
            data: 'Bytes'
        },
        ContractExecResultResult: 'Result<ContractExecResultOk, DispatchError>',
        ContractExecResultTo267: {
            gasConsumed: 'u64',
            debugMessage: 'Text',
            result: 'ContractExecResultResult'
        },
        ContractExecResult: {
            gasConsumed: 'Weight',
            gasRequired: 'Weight',
            storageDeposit: 'StorageDeposit',
            debugMessage: 'Text',
            result: 'ContractExecResultResult'
        },
        ContractExecResultU64: {
            gasConsumed: 'u64',
            gasRequired: 'u64',
            storageDeposit: 'StorageDeposit',
            debugMessage: 'Text',
            result: 'ContractExecResultResult'
        },
        ContractInfo: {
            _enum: {
                Alive: 'AliveContractInfo',
                Tombstone: 'TombstoneContractInfo'
            }
        },
        ContractCallFlags: {
            _set: {
                _bitLength: 32,
                ForwardInput: 0b0000_0001,
                CloneInput: 0b0000_0010,
                TailCall: 0b0000_0100,
                AllowReentry: 0b0000_1000
            }
        },
        ContractReturnFlags: {
            _set: {
                _bitLength: 32,
                Revert: 0x0000_0001
            }
        },
        ContractStorageKey: '[u8; 32]',
        DeletedContract: {
            pairCount: 'u32',
            trieId: 'TrieId'
        },
        ExecReturnValue: {
            flags: 'ContractReturnFlags',
            data: 'Bytes'
        },
        Gas: 'u64',
        HostFnWeightsTo264: {
            caller: 'Weight',
            address: 'Weight',
            gasLeft: 'Weight',
            balance: 'Weight',
            valueTransferred: 'Weight',
            minimumBalance: 'Weight',
            tombstoneDeposit: 'Weight',
            rentAllowance: 'Weight',
            blockNumber: 'Weight',
            now: 'Weight',
            weightToFee: 'Weight',
            gas: 'Weight',
            input: 'Weight',
            inputPerByte: 'Weight',
            return: 'Weight',
            returnPerByte: 'Weight',
            terminate: 'Weight',
            restoreTo: 'Weight',
            restoreToPerDelta: 'Weight',
            random: 'Weight',
            depositEvent: 'Weight',
            depositEventPerTopic: 'Weight',
            depositEventPerByte: 'Weight',
            setRentAllowance: 'Weight',
            setStorage: 'Weight',
            setStoragePerByte: 'Weight',
            clearStorage: 'Weight',
            getStorage: 'Weight',
            getStoragePerByte: 'Weight',
            transfer: 'Weight',
            call: 'Weight',
            callTransferSurcharge: 'Weight',
            callPerInputByte: 'Weight',
            callPerOutputByte: 'Weight',
            instantiate: 'Weight',
            instantiatePerInputByte: 'Weight',
            instantiatePerOutputByte: 'Weight',
            hashSha2256: 'Weight',
            hashSha2256PerByte: 'Weight',
            hashKeccak256: 'Weight',
            hashKeccak256PerByte: 'Weight',
            hashBlake2256: 'Weight',
            hashBlake2256PerByte: 'Weight',
            hashBlake2128: 'Weight',
            hashBlake2128PerByte: 'Weight'
        },
        HostFnWeights: {
            caller: 'Weight',
            address: 'Weight',
            gasLeft: 'Weight',
            balance: 'Weight',
            valueTransferred: 'Weight',
            minimumBalance: 'Weight',
            tombstoneDeposit: 'Weight',
            rentAllowance: 'Weight',
            blockNumber: 'Weight',
            now: 'Weight',
            weightToFee: 'Weight',
            gas: 'Weight',
            input: 'Weight',
            inputPerByte: 'Weight',
            return: 'Weight',
            returnPerByte: 'Weight',
            terminate: 'Weight',
            terminatePerCodeByte: 'Weight',
            restoreTo: 'Weight',
            restoreToPerCallerCodeByte: 'Weight',
            restoreToPerTombstoneCodeByte: 'Weight',
            restoreToPerDelta: 'Weight',
            random: 'Weight',
            depositEvent: 'Weight',
            depositEventPerTopic: 'Weight',
            depositEventPerByte: 'Weight',
            setRentAllowance: 'Weight',
            setStorage: 'Weight',
            setStoragePerByte: 'Weight',
            clearStorage: 'Weight',
            getStorage: 'Weight',
            getStoragePerByte: 'Weight',
            transfer: 'Weight',
            call: 'Weight',
            callPerCodeByte: 'Weight',
            callTransferSurcharge: 'Weight',
            callPerInputByte: 'Weight',
            callPerOutputByte: 'Weight',
            instantiate: 'Weight',
            instantiatePerCodeByte: 'Weight',
            instantiatePerInputByte: 'Weight',
            instantiatePerOutputByte: 'Weight',
            instantiatePerSaltByte: 'Weight',
            hashSha2256: 'Weight',
            hashSha2256PerByte: 'Weight',
            hashKeccak256: 'Weight',
            hashKeccak256PerByte: 'Weight',
            hashBlake2256: 'Weight',
            hashBlake2256PerByte: 'Weight',
            hashBlake2128: 'Weight',
            hashBlake2128PerByte: 'Weight',
            rentParams: 'Weight'
        },
        InstantiateRequestV1: {
            origin: 'AccountId',
            value: 'Balance',
            gasLimit: 'Gas',
            code: 'Bytes',
            data: 'Bytes',
            salt: 'Bytes'
        },
        InstantiateRequestV2: {
            _fallback: 'InstantiateRequestV1',
            origin: 'AccountId',
            value: 'Balance',
            gasLimit: 'Gas',
            storageDepositLimit: 'Option<Balance>',
            code: 'Bytes',
            data: 'Bytes',
            salt: 'Bytes'
        },
        InstantiateRequest: {
            _fallback: 'InstantiateRequestV2',
            origin: 'AccountId',
            value: 'Balance',
            gasLimit: 'Gas',
            storageDepositLimit: 'Option<Balance>',
            code: 'CodeSource',
            data: 'Bytes',
            salt: 'Bytes'
        },
        ContractInstantiateResultTo267: 'Result<InstantiateReturnValueTo267, Null>',
        ContractInstantiateResultTo299: 'Result<InstantiateReturnValueOk, Null>',
        ContractInstantiateResult: {
            gasConsumed: 'WeightV2',
            gasRequired: 'WeightV2',
            storageDeposit: 'StorageDeposit',
            debugMessage: 'Text',
            result: 'InstantiateReturnValue'
        },
        ContractInstantiateResultU64: {
            // only this one can fail, the current version (above) _should_ be correctly
            // versioned now, aka no more deprecated RPCs involved, only runtime calls
            _fallback: 'ContractInstantiateResultTo299',
            gasConsumed: 'u64',
            gasRequired: 'u64',
            storageDeposit: 'StorageDeposit',
            debugMessage: 'Text',
            result: 'InstantiateReturnValue'
        },
        InstantiateReturnValueTo267: {
            result: 'ExecReturnValue',
            accountId: 'AccountId',
            rentProjection: 'Option<RentProjection>'
        },
        InstantiateReturnValueOk: {
            result: 'ExecReturnValue',
            accountId: 'AccountId'
        },
        InstantiateReturnValue: 'Result<InstantiateReturnValueOk, DispatchError>',
        InstructionWeights: {
            i64const: 'u32',
            i64load: 'u32',
            i64store: 'u32',
            select: 'u32',
            rIf: 'u32',
            br: 'u32',
            brIf: 'u32',
            brIable: 'u32',
            brIablePerEntry: 'u32',
            call: 'u32',
            callIndirect: 'u32',
            callIndirectPerParam: 'u32',
            localGet: 'u32',
            localSet: 'u32',
            local_tee: 'u32',
            globalGet: 'u32',
            globalSet: 'u32',
            memoryCurrent: 'u32',
            memoryGrow: 'u32',
            i64clz: 'u32',
            i64ctz: 'u32',
            i64popcnt: 'u32',
            i64eqz: 'u32',
            i64extendsi32: 'u32',
            i64extendui32: 'u32',
            i32wrapi64: 'u32',
            i64eq: 'u32',
            i64ne: 'u32',
            i64lts: 'u32',
            i64ltu: 'u32',
            i64gts: 'u32',
            i64gtu: 'u32',
            i64les: 'u32',
            i64leu: 'u32',
            i64ges: 'u32',
            i64geu: 'u32',
            i64add: 'u32',
            i64sub: 'u32',
            i64mul: 'u32',
            i64divs: 'u32',
            i64divu: 'u32',
            i64rems: 'u32',
            i64remu: 'u32',
            i64and: 'u32',
            i64or: 'u32',
            i64xor: 'u32',
            i64shl: 'u32',
            i64shrs: 'u32',
            i64shru: 'u32',
            i64rotl: 'u32',
            i64rotr: 'u32'
        },
        LimitsTo264: {
            eventTopics: 'u32',
            stackHeight: 'u32',
            globals: 'u32',
            parameters: 'u32',
            memoryPages: 'u32',
            tableSize: 'u32',
            brTableSize: 'u32',
            subjectLen: 'u32',
            codeSize: 'u32'
        },
        Limits: {
            eventTopics: 'u32',
            stackHeight: 'u32',
            globals: 'u32',
            parameters: 'u32',
            memoryPages: 'u32',
            tableSize: 'u32',
            brTableSize: 'u32',
            subjectLen: 'u32'
        },
        PrefabWasmModule: {
            scheduleVersion: 'Compact<u32>',
            initial: 'Compact<u32>',
            maximum: 'Compact<u32>',
            refcount: 'Compact<u64>',
            _reserved: 'Option<Null>',
            code: 'Bytes',
            originalCodeLen: 'u32'
        },
        RentProjection: {
            _enum: {
                EvictionAt: 'BlockNumber',
                NoEviction: 'Null'
            }
        },
        ScheduleTo212: {
            version: 'u32',
            putCodePerByteCost: 'Gas',
            growMemCost: 'Gas',
            regularOpCost: 'Gas',
            returnDataPerByteCost: 'Gas',
            eventDataPerByteCost: 'Gas',
            eventPerTopicCost: 'Gas',
            eventBaseCost: 'Gas',
            sandboxDataReadCost: 'Gas',
            sandboxDataWriteCost: 'Gas',
            maxEventTopics: 'u32',
            maxStackHeight: 'u32',
            maxMemoryPages: 'u32',
            enablePrintln: 'bool',
            maxSubjectLen: 'u32'
        },
        ScheduleTo258: {
            version: 'u32',
            putCodePerByteCost: 'Gas',
            growMemCost: 'Gas',
            regularOpCost: 'Gas',
            returnDataPerByteCost: 'Gas',
            eventDataPerByteCost: 'Gas',
            eventPerTopicCost: 'Gas',
            eventBaseCost: 'Gas',
            sandboxDataReadCost: 'Gas',
            sandboxDataWriteCost: 'Gas',
            transferCost: 'Gas',
            maxEventTopics: 'u32',
            maxStackHeight: 'u32',
            maxMemoryPages: 'u32',
            enablePrintln: 'bool',
            maxSubjectLen: 'u32'
        },
        ScheduleTo264: {
            version: 'u32',
            enablePrintln: 'bool',
            limits: 'LimitsTo264',
            instructionWeights: 'InstructionWeights',
            hostFnWeights: 'HostFnWeightsTo264'
        },
        Schedule: {
            version: 'u32',
            enablePrintln: 'bool',
            limits: 'Limits',
            instructionWeights: 'InstructionWeights',
            hostFnWeights: 'HostFnWeights'
        },
        SeedOf: 'Hash',
        StorageDeposit: {
            _enum: {
                Refund: 'Balance',
                Charge: 'Balance'
            }
        },
        TombstoneContractInfo: 'Hash',
        TrieId: 'Bytes'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/democracy/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AllConvictions",
    ()=>AllConvictions,
    "default",
    ()=>__TURBOPACK__default__export__
]);
const AllConvictions = [
    // 0.1x votes, unlocked.
    'None',
    // 1x votes, locked for an enactment period following a successful vote.
    'Locked1x',
    // 2x votes, locked for 2x enactment periods following a successful vote.
    'Locked2x',
    // 3x votes, locked for 4x...
    'Locked3x',
    // 4x votes, locked for 8x...
    'Locked4x',
    // 5x votes, locked for 16x...
    'Locked5x',
    // 6x votes, locked for 32x...
    'Locked6x'
];
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        AccountVote: {
            _enum: {
                Standard: 'AccountVoteStandard',
                Split: 'AccountVoteSplit'
            }
        },
        AccountVoteSplit: {
            aye: 'Balance',
            nay: 'Balance'
        },
        AccountVoteStandard: {
            vote: 'Vote',
            balance: 'Balance'
        },
        Conviction: {
            _enum: AllConvictions
        },
        Delegations: {
            votes: 'Balance',
            capital: 'Balance'
        },
        PreimageStatus: {
            _enum: {
                Missing: 'BlockNumber',
                Available: 'PreimageStatusAvailable'
            }
        },
        PreimageStatusAvailable: {
            data: 'Bytes',
            provider: 'AccountId',
            deposit: 'Balance',
            since: 'BlockNumber',
            expiry: 'Option<BlockNumber>'
        },
        PriorLock: '(BlockNumber, Balance)',
        PropIndex: 'u32',
        Proposal: 'Call',
        ProxyState: {
            _enum: {
                Open: 'AccountId',
                Active: 'AccountId'
            }
        },
        ReferendumIndex: 'u32',
        ReferendumInfoTo239: {
            end: 'BlockNumber',
            proposalHash: 'Hash',
            threshold: 'VoteThreshold',
            delay: 'BlockNumber'
        },
        ReferendumInfo: {
            _enum: {
                Ongoing: 'ReferendumStatus',
                Finished: 'ReferendumInfoFinished'
            }
        },
        ReferendumInfoFinished: {
            approved: 'bool',
            end: 'BlockNumber'
        },
        ReferendumStatus: {
            end: 'BlockNumber',
            proposalHash: 'Hash',
            threshold: 'VoteThreshold',
            delay: 'BlockNumber',
            tally: 'Tally'
        },
        Tally: {
            ayes: 'Balance',
            nays: 'Balance',
            turnout: 'Balance'
        },
        Voting: {
            _enum: {
                Direct: 'VotingDirect',
                Delegating: 'VotingDelegating'
            }
        },
        VotingDirect: {
            votes: 'Vec<VotingDirectVote>',
            delegations: 'Delegations',
            prior: 'PriorLock'
        },
        VotingDirectVote: '(ReferendumIndex, AccountVote)',
        VotingDelegating: {
            balance: 'Balance',
            target: 'AccountId',
            conviction: 'Conviction',
            delegations: 'Delegations',
            prior: 'PriorLock'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/dev/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    getBlockStats: {
        description: 'Reexecute the specified `block_hash` and gather statistics while doing so',
        isUnsafe: true,
        params: [
            {
                isHistoric: true,
                name: 'at',
                type: 'Hash'
            }
        ],
        type: 'Option<BlockStats>'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/dev/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$dev$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/dev/rpc.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$dev$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    types: {
        BlockStats: {
            witnessLen: 'u64',
            witnessCompactLen: 'u64',
            blockLen: 'u64',
            blockNumExtrinsics: 'u64'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/discovery/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    AuthorityDiscoveryApi: [
        {
            methods: {
                authorities: {
                    description: 'Retrieve authority identifiers of the current and next authority set.',
                    params: [],
                    type: 'Vec<AuthorityId>'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/discovery/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$discovery$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/discovery/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$discovery$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {}
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/elections/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        ApprovalFlag: 'u32',
        DefunctVoter: {
            who: 'AccountId',
            voteCount: 'Compact<u32>',
            candidateCount: 'Compact<u32>'
        },
        Renouncing: {
            _enum: {
                Member: 'Null',
                RunnerUp: 'Null',
                Candidate: 'Compact<u32>'
            }
        },
        SetIndex: 'u32',
        Vote: 'GenericVote',
        VoteIndex: 'u32',
        VoterInfo: {
            lastActive: 'VoteIndex',
            lastWin: 'VoteIndex',
            pot: 'Balance',
            stake: 'Balance'
        },
        VoteThreshold: {
            _enum: [
                'Super Majority Approve',
                'Super Majority Against',
                'Simple Majority'
            ]
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/engine/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    createBlock: {
        description: 'Instructs the manual-seal authorship task to create a new block',
        params: [
            {
                name: 'createEmpty',
                type: 'bool'
            },
            {
                name: 'finalize',
                type: 'bool'
            },
            {
                isOptional: true,
                name: 'parentHash',
                type: 'BlockHash'
            }
        ],
        type: 'CreatedBlock'
    },
    finalizeBlock: {
        description: 'Instructs the manual-seal authorship task to finalize a block',
        params: [
            {
                name: 'hash',
                type: 'BlockHash'
            },
            {
                isOptional: true,
                name: 'justification',
                type: 'Justification'
            }
        ],
        type: 'bool'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/engine/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$engine$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/engine/rpc.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$engine$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    types: {
        CreatedBlock: {
            _alias: {
                blockHash: 'hash'
            },
            blockHash: 'BlockHash',
            aux: 'ImportedAux'
        },
        ImportedAux: {
            headerOnly: 'bool',
            clearJustificationRequests: 'bool',
            needsJustification: 'bool',
            badJustification: 'bool',
            needsFinalityProof: 'bool',
            isNewBest: 'bool'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/evm/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        EvmAccount: {
            nonce: 'u256',
            balance: 'u256'
        },
        EvmCallInfo: {
            exitReason: 'ExitReason',
            value: 'Bytes',
            usedGas: 'U256',
            logs: 'Vec<EvmLog>'
        },
        EvmCreateInfo: {
            exitReason: 'ExitReason',
            value: 'H160',
            usedGas: 'U256',
            logs: 'Vec<EvmLog>'
        },
        EvmCallInfoV2: {
            exitReason: 'ExitReason',
            value: 'Bytes',
            usedGas: 'U256',
            weightInfo: 'Option<EvmWeightInfo>',
            logs: 'Vec<EvmLog>'
        },
        EvmCreateInfoV2: {
            exitReason: 'ExitReason',
            value: 'H160',
            usedGas: 'U256',
            weightInfo: 'Option<EvmWeightInfo>',
            logs: 'Vec<EvmLog>'
        },
        EvmLog: {
            address: 'H160',
            topics: 'Vec<H256>',
            data: 'Bytes'
        },
        EvmVicinity: {
            gasPrice: 'u256',
            origin: 'H160'
        },
        EvmWeightInfo: {
            refTimeLimit: 'Option<u64>',
            proofSizeLimit: 'Option<u64>',
            refTimeUsage: 'Option<u64>',
            proofSizeUsage: 'Option<u64>'
        },
        ExitError: {
            _enum: {
                StackUnderflow: 'Null',
                StackOverflow: 'Null',
                InvalidJump: 'Null',
                InvalidRange: 'Null',
                DesignatedInvalid: 'Null',
                CallTooDeep: 'Null',
                CreateCollision: 'Null',
                CreateContractLimit: 'Null',
                OutOfOffset: 'Null',
                OutOfGas: 'Null',
                OutOfFund: 'Null',
                PCUnderflow: 'Null',
                CreateEmpty: 'Null',
                Other: 'Text'
            }
        },
        ExitFatal: {
            _enum: {
                NotSupported: 'Null',
                UnhandledInterrupt: 'Null',
                CallErrorAsFatal: 'ExitError',
                Other: 'Text'
            }
        },
        ExitReason: {
            _enum: {
                Succeed: 'ExitSucceed',
                Error: 'ExitError',
                Revert: 'ExitRevert',
                Fatal: 'ExitFatal'
            }
        },
        ExitRevert: {
            _enum: [
                'Reverted'
            ]
        },
        ExitSucceed: {
            _enum: [
                'Stopped',
                'Returned',
                'Suicided'
            ]
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/extrinsics/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        Extrinsic: 'GenericExtrinsic',
        ExtrinsicEra: 'GenericExtrinsicEra',
        ExtrinsicPayload: 'GenericExtrinsicPayload',
        ExtrinsicSignature: 'MultiSignature',
        ExtrinsicV4: 'GenericExtrinsicV4',
        ExtrinsicPayloadV4: 'GenericExtrinsicPayloadV4',
        ExtrinsicSignatureV4: 'GenericExtrinsicSignatureV4',
        ExtrinsicUnknown: 'GenericExtrinsicUnknown',
        ExtrinsicPayloadUnknown: 'GenericExtrinsicPayloadUnknown',
        ExtrinsicV5: 'GenericExtrinsicV5',
        ExtrinsicPayloadV5: 'GenericExtrinsicPayloadV5',
        ExtrinsicSignatureV5: 'GenericExtrinsicSignatureV5',
        // eras
        Era: 'ExtrinsicEra',
        ImmortalEra: 'GenericImmortalEra',
        MortalEra: 'GenericMortalEra',
        // signatures & signer
        AnySignature: 'H512',
        MultiSignature: {
            _enum: {
                Ed25519: 'Ed25519Signature',
                Sr25519: 'Sr25519Signature',
                Ecdsa: 'EcdsaSignature'
            }
        },
        Signature: 'H512',
        SignerPayload: 'GenericSignerPayload',
        EcdsaSignature: '[u8; 65]',
        Ed25519Signature: 'H512',
        Sr25519Signature: 'H512'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/fungibles/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    FungiblesApi: [
        {
            methods: {
                query_account_balances: {
                    description: 'Returns the list of all `MultiAsset` that an `AccountId` has',
                    params: [
                        {
                            name: 'account',
                            type: 'AccountId'
                        }
                    ],
                    type: 'Result<Vec<XcmV3MultiAsset>, FungiblesAccessError>'
                }
            },
            version: 1
        },
        {
            methods: {
                query_account_balances: {
                    description: 'Returns the list of all `MultiAsset` that an `AccountId` has',
                    params: [
                        {
                            name: 'account',
                            type: 'AccountId'
                        }
                    ],
                    type: 'Result<XcmVersionedAssets, FungiblesAccessError>'
                }
            },
            version: 2
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/fungibles/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$fungibles$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/fungibles/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$fungibles$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        FungiblesAccessError: {
            _enum: [
                'AssetIdConversionFailed',
                'AmountToBalanceConversionFailed'
            ]
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/genericAsset/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        AssetOptions: {
            initalIssuance: 'Compact<Balance>',
            permissions: 'PermissionLatest'
        },
        Owner: {
            _enum: {
                None: 'Null',
                Address: 'AccountId'
            }
        },
        PermissionsV1: {
            update: 'Owner',
            mint: 'Owner',
            burn: 'Owner'
        },
        PermissionVersions: {
            _enum: {
                V1: 'PermissionsV1'
            }
        },
        PermissionLatest: 'PermissionsV1'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/genesisBuilder/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    GenesisBuilder: [
        {
            methods: {
                build_config: {
                    description: 'Build `RuntimeGenesisConfig` from a JSON blob not using any defaults and store it in the storage.',
                    params: [
                        {
                            name: 'json',
                            type: 'Vec<u8>'
                        }
                    ],
                    type: 'Result<(), GenesisBuildErr>'
                },
                create_default_config: {
                    description: 'Creates the default `RuntimeGenesisConfig` and returns it as a JSON blob.',
                    params: [],
                    type: 'Vec<u8>'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/genesisBuilder/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$genesisBuilder$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/genesisBuilder/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$genesisBuilder$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        GenesisBuildErr: 'Text'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/gilt/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        ActiveGilt: {
            proportion: 'Perquintill',
            amount: 'Balance',
            who: 'AccountId',
            expiry: 'BlockNumber'
        },
        ActiveGiltsTotal: {
            frozen: 'Balance',
            proportion: 'Perquintill',
            index: 'ActiveIndex',
            target: 'Perquintill'
        },
        ActiveIndex: 'u32',
        GiltBid: {
            amount: 'Balance',
            who: 'AccountId'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/grandpa/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    proveFinality: {
        description: 'Prove finality for the given block number, returning the Justification for the last block in the set.',
        params: [
            {
                name: 'blockNumber',
                type: 'BlockNumber'
            }
        ],
        type: 'Option<EncodedFinalityProofs>'
    },
    roundState: {
        description: 'Returns the state of the current best round state as well as the ongoing background rounds',
        params: [],
        type: 'ReportedRoundStates'
    },
    subscribeJustifications: {
        description: 'Subscribes to grandpa justifications',
        params: [],
        pubsub: [
            'justifications',
            'subscribeJustifications',
            'unsubscribeJustifications'
        ],
        type: 'JustificationNotification'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/grandpa/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const GRANDPA_V2_V3 = {
    generate_key_ownership_proof: {
        description: 'Generates a proof of key ownership for the given authority in the given set.',
        params: [
            {
                name: 'setId',
                type: 'SetId'
            },
            {
                name: 'authorityId',
                type: 'AuthorityId'
            }
        ],
        type: 'Option<OpaqueKeyOwnershipProof>'
    },
    grandpa_authorities: {
        description: 'Get the current GRANDPA authorities and weights. This should not change except for when changes are scheduled and the corresponding delay has passed.',
        params: [],
        type: 'AuthorityList'
    },
    submit_report_equivocation_unsigned_extrinsic: {
        description: 'Submits an unsigned extrinsic to report an equivocation.',
        params: [
            {
                name: 'equivocationProof',
                type: 'GrandpaEquivocationProof'
            },
            {
                name: 'keyOwnerProof',
                type: 'OpaqueKeyOwnershipProof'
            }
        ],
        type: 'Option<Null>'
    }
};
const runtime = {
    GrandpaApi: [
        {
            methods: {
                current_set_id: {
                    description: 'Get current GRANDPA authority set id.',
                    params: [],
                    type: 'SetId'
                },
                ...GRANDPA_V2_V3
            },
            version: 3
        },
        {
            methods: GRANDPA_V2_V3,
            version: 2
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/grandpa/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$grandpa$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/grandpa/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$grandpa$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/grandpa/runtime.js [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$grandpa$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$grandpa$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        AuthorityIndex: 'u64',
        AuthorityList: 'Vec<NextAuthority>',
        AuthoritySet: {
            currentAuthorities: 'AuthorityList',
            setId: 'u64',
            pendingStandardChanges: 'ForkTreePendingChange',
            pendingForcedChanges: 'Vec<PendingChange>',
            authoritySetChanges: 'AuthoritySetChanges'
        },
        ForkTreePendingChange: {
            roots: 'Vec<ForkTreePendingChangeNode>',
            bestFinalizedNumber: 'Option<BlockNumber>'
        },
        ForkTreePendingChangeNode: {
            hash: 'BlockHash',
            number: 'BlockNumber',
            data: 'PendingChange',
            children: 'Vec<ForkTreePendingChangeNode>'
        },
        AuthoritySetChange: '(U64, BlockNumber)',
        AuthoritySetChanges: 'Vec<AuthoritySetChange>',
        AuthorityWeight: 'u64',
        DelayKind: {
            _enum: {
                Finalized: 'Null',
                Best: 'DelayKindBest'
            }
        },
        DelayKindBest: {
            medianLastFinalized: 'BlockNumber'
        },
        EncodedFinalityProofs: 'Bytes',
        GrandpaEquivocation: {
            _enum: {
                Prevote: 'GrandpaEquivocationValue',
                Precommit: 'GrandpaEquivocationValue'
            }
        },
        GrandpaEquivocationProof: {
            setId: 'SetId',
            equivocation: 'GrandpaEquivocation'
        },
        GrandpaEquivocationValue: {
            roundNumber: 'u64',
            identity: 'AuthorityId',
            first: '(GrandpaPrevote, AuthoritySignature)',
            second: '(GrandpaPrevote, AuthoritySignature)'
        },
        GrandpaPrevote: {
            targetHash: 'Hash',
            targetNumber: 'BlockNumber'
        },
        GrandpaCommit: {
            targetHash: 'BlockHash',
            targetNumber: 'BlockNumber',
            precommits: 'Vec<GrandpaSignedPrecommit>'
        },
        GrandpaPrecommit: {
            targetHash: 'BlockHash',
            targetNumber: 'BlockNumber'
        },
        GrandpaSignedPrecommit: {
            precommit: 'GrandpaPrecommit',
            signature: 'AuthoritySignature',
            id: 'AuthorityId'
        },
        GrandpaJustification: {
            round: 'u64',
            commit: 'GrandpaCommit',
            votesAncestries: 'Vec<Header>'
        },
        JustificationNotification: 'Bytes',
        KeyOwnerProof: 'MembershipProof',
        NextAuthority: '(AuthorityId, AuthorityWeight)',
        PendingChange: {
            nextAuthorities: 'AuthorityList',
            delay: 'BlockNumber',
            canonHeight: 'BlockNumber',
            canonHash: 'BlockHash',
            delayKind: 'DelayKind'
        },
        PendingPause: {
            scheduledAt: 'BlockNumber',
            delay: 'BlockNumber'
        },
        PendingResume: {
            scheduledAt: 'BlockNumber',
            delay: 'BlockNumber'
        },
        Precommits: {
            currentWeight: 'u32',
            missing: 'BTreeSet<AuthorityId>'
        },
        Prevotes: {
            currentWeight: 'u32',
            missing: 'BTreeSet<AuthorityId>'
        },
        ReportedRoundStates: {
            setId: 'u32',
            best: 'RoundState',
            background: 'Vec<RoundState>'
        },
        RoundState: {
            round: 'u32',
            totalWeight: 'u32',
            thresholdWeight: 'u32',
            prevotes: 'Prevotes',
            precommits: 'Precommits'
        },
        SetId: 'u64',
        StoredPendingChange: {
            scheduledAt: 'BlockNumber',
            delay: 'BlockNumber',
            nextAuthorities: 'AuthorityList'
        },
        StoredState: {
            _enum: {
                Live: 'Null',
                PendingPause: 'PendingPause',
                Paused: 'Null',
                PendingResume: 'PendingResume'
            }
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/identity/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        IdentityFields: {
            _set: {
                _bitLength: 64,
                // Mapped here to 32 bits, in Rust these are 64-bit values
                Display: 0b00000000_00000000_00000000_0000_0001,
                Legal: 0b00000000_00000000_00000000_0000_0010,
                Web: 0b00000000_00000000_00000000_0000_0100,
                Riot: 0b00000000_00000000_00000000_0000_1000,
                Email: 0b00000000_00000000_00000000_0001_0000,
                PgpFingerprint: 0b00000000_00000000_00000000_0010_0000,
                Image: 0b00000000_00000000_00000000_0100_0000,
                Twitter: 0b00000000_00000000_00000000_1000_0000
            }
        },
        IdentityInfoAdditional: '(Data, Data)',
        IdentityInfoTo198: {
            additional: 'Vec<IdentityInfoAdditional>',
            display: 'Data',
            legal: 'Data',
            web: 'Data',
            riot: 'Data',
            email: 'Data',
            pgpFingerprint: 'Option<H160>',
            image: 'Data'
        },
        IdentityInfo: {
            _fallback: 'IdentityInfoTo198',
            additional: 'Vec<IdentityInfoAdditional>',
            display: 'Data',
            legal: 'Data',
            web: 'Data',
            riot: 'Data',
            email: 'Data',
            pgpFingerprint: 'Option<H160>',
            image: 'Data',
            twitter: 'Data'
        },
        IdentityJudgement: {
            _enum: {
                Unknown: 'Null',
                FeePaid: 'Balance',
                Reasonable: 'Null',
                KnownGood: 'Null',
                OutOfDate: 'Null',
                LowQuality: 'Null',
                Erroneous: 'Null'
            }
        },
        RegistrationJudgement: '(RegistrarIndex, IdentityJudgement)',
        RegistrationTo198: {
            judgements: 'Vec<RegistrationJudgement>',
            deposit: 'Balance',
            info: 'IdentityInfoTo198'
        },
        Registration: {
            _fallback: 'RegistrationTo198',
            judgements: 'Vec<RegistrationJudgement>',
            deposit: 'Balance',
            info: 'IdentityInfo'
        },
        RegistrarIndex: 'u32',
        RegistrarInfo: {
            account: 'AccountId',
            fee: 'Balance',
            fields: 'IdentityFields'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/imOnline/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        AuthIndex: 'u32',
        AuthoritySignature: 'Signature',
        Heartbeat: {
            blockNumber: 'BlockNumber',
            networkState: 'OpaqueNetworkState',
            sessionIndex: 'SessionIndex',
            authorityIndex: 'AuthIndex',
            validatorsLen: 'u32'
        },
        HeartbeatTo244: {
            blockNumber: 'BlockNumber',
            networkState: 'OpaqueNetworkState',
            sessionIndex: 'SessionIndex',
            authorityIndex: 'AuthIndex'
        },
        OpaqueMultiaddr: 'Opaque<Bytes>',
        OpaquePeerId: 'Opaque<Bytes>',
        OpaqueNetworkState: {
            peerId: 'OpaquePeerId',
            externalAddresses: 'Vec<OpaqueMultiaddr>'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/lottery/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        CallIndex: '(u8, u8)',
        LotteryConfig: {
            price: 'Balance',
            start: 'BlockNumber',
            length: 'BlockNumber',
            delay: 'BlockNumber',
            repeat: 'bool'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/mixnet/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    MixnetApi: [
        {
            methods: {
                current_mixnodes: {
                    description: 'Get the index and phase of the current session.',
                    params: [],
                    type: 'Result<Mixnode, MixnodesErr>'
                },
                maybe_register: {
                    description: 'Try to register a mixnode for the next session.',
                    params: [
                        {
                            name: 'session_index',
                            type: 'u32'
                        },
                        {
                            name: 'mixnode',
                            type: 'Mixnode'
                        }
                    ],
                    type: 'bool'
                },
                prev_mixnodes: {
                    description: 'Get the index and phase of the current session.',
                    params: [],
                    type: 'Result<Mixnode, MixnodesErr>'
                },
                session_status: {
                    description: 'Get the index and phase of the current session.',
                    params: [],
                    type: 'SessionStatus'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/mixnet/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$mixnet$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/mixnet/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$mixnet$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        Mixnode: {
            externalAddresses: 'Vec<Bytes>',
            kxPublic: '[u8; 32]',
            peerId: '[u8; 32]'
        },
        MixnodesErr: {
            _enum: {
                InsufficientRegistrations: {
                    min: 'u32',
                    num: 'u32'
                }
            }
        },
        SessionPhase: {
            _enum: [
                'CoverToCurrent',
                'RequestsToCurrent',
                'CoverToPrev',
                'DisconnectFromPrev'
            ]
        },
        SessionStatus: {
            currentIndex: 'u32',
            phase: 'SessionPhase'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/mmr/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    generateProof: {
        description: 'Generate MMR proof for the given block numbers.',
        params: [
            {
                name: 'blockNumbers',
                type: 'Vec<u64>'
            },
            {
                isOptional: true,
                name: 'bestKnownBlockNumber',
                type: 'u64'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'MmrLeafBatchProof'
    },
    root: {
        description: 'Get the MMR root hash for the current best block.',
        params: [
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'MmrHash'
    },
    verifyProof: {
        description: 'Verify an MMR proof',
        params: [
            {
                name: 'proof',
                type: 'MmrLeafBatchProof'
            }
        ],
        type: 'bool'
    },
    verifyProofStateless: {
        description: 'Verify an MMR proof statelessly given an mmr_root',
        params: [
            {
                name: 'root',
                type: 'MmrHash'
            },
            {
                name: 'proof',
                type: 'MmrLeafBatchProof'
            }
        ],
        type: 'bool'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/mmr/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const MMR_V2 = {
    generate_proof: {
        description: 'Generate MMR proof for the given block numbers.',
        params: [
            {
                name: 'blockNumbers',
                type: 'Vec<BlockNumber>'
            },
            {
                name: 'bestKnownBlockNumber',
                type: 'Option<BlockNumber>'
            }
        ],
        type: 'Result<(Vec<MmrEncodableOpaqueLeaf>, MmrBatchProof), MmrError>'
    },
    mmr_leaf_count: {
        description: 'Return the number of MMR blocks in the chain.',
        params: [],
        type: 'Result<U64, MmrError>'
    },
    mmr_root: {
        description: 'Return the on-chain MMR root hash.',
        params: [],
        type: 'Result<Hash, MmrError>'
    },
    verify_proof: {
        description: 'Verify MMR proof against on-chain MMR.',
        params: [
            {
                name: 'leaves',
                type: 'Vec<MmrEncodableOpaqueLeaf>'
            },
            {
                name: 'proof',
                type: 'MmrBatchProof'
            }
        ],
        type: 'Result<(), MmrError>'
    },
    verify_proof_stateless: {
        description: 'Verify MMR proof against given root hash.',
        params: [
            {
                name: 'root',
                type: 'Hash'
            },
            {
                name: 'leaves',
                type: 'Vec<MmrEncodableOpaqueLeaf>'
            },
            {
                name: 'proof',
                type: 'MmrBatchProof'
            }
        ],
        type: 'Result<(), MmrError>'
    }
};
const MMR_V1 = {
    generate_batch_proof: {
        description: 'Generate MMR proof for a series of leaves under given indices.',
        params: [
            {
                name: 'leafIndices',
                type: 'Vec<MmrLeafIndex>'
            }
        ],
        type: 'Result<(Vec<MmrEncodableOpaqueLeaf>, MmrBatchProof), MmrError>'
    },
    generate_proof: {
        description: 'Generate MMR proof for a leaf under given index.',
        params: [
            {
                name: 'leafIndex',
                type: 'MmrLeafIndex'
            }
        ],
        type: 'Result<(MmrEncodableOpaqueLeaf, MmrProof), MmrError>'
    },
    mmr_root: {
        description: 'Return the on-chain MMR root hash.',
        params: [],
        type: 'Result<Hash, MmrError>'
    },
    verify_batch_proof: {
        description: 'Verify MMR proof against on-chain MMR for a batch of leaves.',
        params: [
            {
                name: 'leaves',
                type: 'Vec<MmrEncodableOpaqueLeaf>'
            },
            {
                name: 'proof',
                type: 'MmrBatchProof'
            }
        ],
        type: 'Result<(), MmrError>'
    },
    verify_batch_proof_stateless: {
        description: 'Verify MMR proof against given root hash or a batch of leaves.',
        params: [
            {
                name: 'root',
                type: 'Hash'
            },
            {
                name: 'leaves',
                type: 'Vec<MmrEncodableOpaqueLeaf>'
            },
            {
                name: 'proof',
                type: 'MmrBatchProof'
            }
        ],
        type: 'Result<(), MmrError>'
    },
    verify_proof: {
        description: 'Verify MMR proof against on-chain MMR.',
        params: [
            {
                name: 'leaf',
                type: 'MmrEncodableOpaqueLeaf'
            },
            {
                name: 'proof',
                type: 'MmrProof'
            }
        ],
        type: 'Result<(), MmrError>'
    },
    verify_proof_stateless: {
        description: 'Verify MMR proof against given root hash.',
        params: [
            {
                name: 'root',
                type: 'Hash'
            },
            {
                name: 'leaf',
                type: 'MmrEncodableOpaqueLeaf'
            },
            {
                name: 'proof',
                type: 'MmrProof'
            }
        ],
        type: 'Result<(), MmrError>'
    }
};
const runtime = {
    MmrApi: [
        {
            methods: MMR_V2,
            version: 2
        },
        {
            methods: MMR_V1,
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/mmr/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$mmr$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/mmr/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$mmr$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/mmr/runtime.js [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$mmr$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$mmr$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        MmrBatchProof: {
            leafIndices: 'Vec<MmrLeafIndex>',
            leafCount: 'MmrNodeIndex',
            items: 'Vec<Hash>'
        },
        MmrEncodableOpaqueLeaf: 'Bytes',
        MmrError: {
            _enum: [
                'InvalidNumericOp',
                'Push',
                'GetRoot',
                'Commit',
                'GenerateProof',
                'Verify',
                'LeafNotFound',
                ' PalletNotIncluded',
                'InvalidLeafIndex',
                'InvalidBestKnownBlock'
            ]
        },
        MmrHash: 'Hash',
        MmrLeafBatchProof: {
            blockHash: 'BlockHash',
            leaves: 'Bytes',
            proof: 'Bytes'
        },
        MmrLeafIndex: 'u64',
        MmrLeafProof: {
            blockHash: 'BlockHash',
            leaf: 'Bytes',
            proof: 'Bytes'
        },
        MmrNodeIndex: 'u64',
        MmrProof: {
            leafIndex: 'MmrLeafIndex',
            leafCount: 'MmrNodeIndex',
            items: 'Vec<Hash>'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/nfts/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    NftsApi: [
        {
            methods: {
                attribute: {
                    description: 'An attribute',
                    params: [
                        {
                            name: 'collection',
                            type: 'NftCollectionId'
                        },
                        {
                            name: 'item',
                            type: 'NftItemId'
                        },
                        {
                            name: 'key',
                            type: 'Bytes'
                        }
                    ],
                    type: 'Option<Bytes>'
                },
                collection_attribute: {
                    description: 'A collection attribute',
                    params: [
                        {
                            name: 'collection',
                            type: 'NftCollectionId'
                        },
                        {
                            name: 'key',
                            type: 'Bytes'
                        }
                    ],
                    type: 'Option<Bytes>'
                },
                collection_owner: {
                    description: 'A collection owner',
                    params: [
                        {
                            name: 'collection',
                            type: 'NftCollectionId'
                        }
                    ],
                    type: 'Option<AccountId>'
                },
                custom_attribute: {
                    description: 'A custom attribute',
                    params: [
                        {
                            name: 'account',
                            type: 'AccountId'
                        },
                        {
                            name: 'collection',
                            type: 'NftCollectionId'
                        },
                        {
                            name: 'item',
                            type: 'NftItemId'
                        },
                        {
                            name: 'key',
                            type: 'Bytes'
                        }
                    ],
                    type: 'Option<Bytes>'
                },
                owner: {
                    description: 'Collection owner',
                    params: [
                        {
                            name: 'collection',
                            type: 'NftCollectionId'
                        },
                        {
                            name: 'item',
                            type: 'NftItemId'
                        }
                    ],
                    type: 'Option<AccountId>'
                },
                system_attribute: {
                    description: 'System attribute',
                    params: [
                        {
                            name: 'collection',
                            type: 'NftCollectionId'
                        },
                        {
                            name: 'item',
                            type: 'NftItemId'
                        },
                        {
                            name: 'key',
                            type: 'Bytes'
                        }
                    ],
                    type: 'Option<Bytes>'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/nfts/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$nfts$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/nfts/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$nfts$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        NftCollectionId: 'u32',
        NftItemId: 'u32'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/nompools/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    NominationPoolsApi: [
        {
            methods: {
                balance_to_points: {
                    description: 'Returns the equivalent points of `new_funds` for a given pool.',
                    params: [
                        {
                            name: 'poolId',
                            type: 'NpPoolId'
                        },
                        {
                            name: 'newFunds',
                            type: 'Balance'
                        }
                    ],
                    type: 'Balance'
                },
                pending_rewards: {
                    description: 'Returns the pending rewards for the given member.',
                    params: [
                        {
                            name: 'member',
                            type: 'AccountId'
                        }
                    ],
                    type: 'Balance'
                },
                points_to_balance: {
                    description: 'Returns the equivalent balance of `points` for a given pool.',
                    params: [
                        {
                            name: 'poolId',
                            type: 'NpPoolId'
                        },
                        {
                            name: 'points',
                            type: 'Balance'
                        }
                    ],
                    type: 'Balance'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/nompools/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$nompools$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/nompools/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$nompools$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        NpApiError: {
            _enum: [
                'MemberNotFound',
                'OverflowInPendingRewards'
            ]
        },
        NpPoolId: 'u32'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/offences/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        DeferredOffenceOf: '(Vec<OffenceDetails>, Vec<Perbill>, SessionIndex)',
        Kind: '[u8; 16]',
        OffenceDetails: {
            offender: 'Offender',
            reporters: 'Vec<Reporter>'
        },
        Offender: 'IdentificationTuple',
        OpaqueTimeSlot: 'Bytes',
        ReportIdOf: 'Hash',
        Reporter: 'AccountId'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/pow/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    DifficultyApi: [
        {
            methods: {
                difficulty: {
                    description: 'Return the target difficulty of the next block.',
                    params: [],
                    // This is Difficulty in the original, however this is chain-specific
                    type: 'Raw'
                }
            },
            version: 1
        }
    ],
    TimestampApi: [
        {
            methods: {
                timestamp: {
                    description: 'API necessary for timestamp-based difficulty adjustment algorithms.',
                    params: [],
                    type: 'Moment'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/pow/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$pow$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/pow/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$pow$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {}
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/proxy/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        ProxyDefinition: {
            delegate: 'AccountId',
            proxyType: 'ProxyType',
            delay: 'BlockNumber'
        },
        ProxyType: {
            _enum: [
                'Any',
                'NonTransfer',
                'Governance',
                'Staking'
            ]
        },
        ProxyAnnouncement: {
            real: 'AccountId',
            callHash: 'Hash',
            height: 'BlockNumber'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/recovery/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        ActiveRecovery: {
            created: 'BlockNumber',
            deposit: 'Balance',
            friends: 'Vec<AccountId>'
        },
        RecoveryConfig: {
            delayPeriod: 'BlockNumber',
            deposit: 'Balance',
            friends: 'Vec<AccountId>',
            threshold: 'u16'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/scheduler/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        Period: '(BlockNumber, u32)',
        Priority: 'u8',
        SchedulePeriod: 'Period',
        SchedulePriority: 'Priority',
        Scheduled: {
            maybeId: 'Option<Bytes>',
            priority: 'SchedulePriority',
            call: 'Call',
            maybePeriodic: 'Option<SchedulePeriod>',
            origin: 'PalletsOrigin'
        },
        ScheduledTo254: {
            maybeId: 'Option<Bytes>',
            priority: 'SchedulePriority',
            call: 'Call',
            maybePeriodic: 'Option<SchedulePeriod>'
        },
        TaskAddress: '(BlockNumber, u32)'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/session/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    SessionKeys: [
        {
            methods: {
                decode_session_keys: {
                    description: 'Decode the given public session keys.',
                    params: [
                        {
                            name: 'encoded',
                            type: 'Bytes'
                        }
                    ],
                    type: 'Option<Vec<(Bytes, KeyTypeId)>>'
                },
                generate_session_keys: {
                    description: 'Generate a set of session keys with optionally using the given seed.',
                    params: [
                        {
                            name: 'seed',
                            type: 'Option<Bytes>'
                        }
                    ],
                    type: 'Bytes'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/session/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$session$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/session/runtime.js [app-client] (ecmascript)");
;
const keyTypes = {
    // key for beefy
    BeefyKey: '[u8; 33]',
    // default to Substrate master defaults, 4 keys (polkadot master, 5 keys)
    Keys: 'SessionKeys4',
    SessionKeys1: '(AccountId)',
    SessionKeys2: '(AccountId, AccountId)',
    SessionKeys3: '(AccountId, AccountId, AccountId)',
    SessionKeys4: '(AccountId, AccountId, AccountId, AccountId)',
    SessionKeys5: '(AccountId, AccountId, AccountId, AccountId, AccountId)',
    SessionKeys6: '(AccountId, AccountId, AccountId, AccountId, AccountId, AccountId)',
    SessionKeys6B: '(AccountId, AccountId, AccountId, AccountId, AccountId, BeefyKey)',
    SessionKeys7: '(AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId)',
    SessionKeys7B: '(AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, BeefyKey)',
    SessionKeys8: '(AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId)',
    SessionKeys8B: '(AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, BeefyKey)',
    SessionKeys9: '(AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId)',
    SessionKeys9B: '(AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, BeefyKey)',
    SessionKeys10: '(AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId)',
    SessionKeys10B: '(AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, AccountId, BeefyKey)'
};
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$session$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        ...keyTypes,
        FullIdentification: 'Exposure',
        IdentificationTuple: '(ValidatorId, FullIdentification)',
        MembershipProof: {
            session: 'SessionIndex',
            trieNodes: 'Vec<Bytes>',
            validatorCount: 'ValidatorCount'
        },
        SessionIndex: 'u32',
        ValidatorCount: 'u32'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/society/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        Bid: {
            who: 'AccountId',
            kind: 'BidKind',
            value: 'Balance'
        },
        BidKind: {
            _enum: {
                Deposit: 'Balance',
                Vouch: '(AccountId, Balance)'
            }
        },
        // a society-specific Judgement (not the same as identity Judgement)
        SocietyJudgement: {
            _enum: [
                'Rebid',
                'Reject',
                'Approve'
            ]
        },
        // a society-specific Vote
        SocietyVote: {
            _enum: [
                'Skeptic',
                'Reject',
                'Approve'
            ]
        },
        StrikeCount: 'u32',
        VouchingStatus: {
            _enum: [
                'Vouching',
                'Banned'
            ]
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/staking/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    StakingApi: [
        {
            methods: {
                nominations_quota: {
                    description: 'Returns the nominations quota for a nominator with a given balance.',
                    params: [
                        {
                            name: 'balance',
                            type: 'Balance'
                        }
                    ],
                    type: 'u32'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/staking/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$staking$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/staking/runtime.js [app-client] (ecmascript)");
;
const deprecated = {
    Points: 'u32',
    EraPoints: {
        total: 'Points',
        individual: 'Vec<Points>'
    }
};
const phragmen = {
    CompactAssignments: 'CompactAssignmentsWith16',
    CompactAssignmentsWith16: {
        votes1: 'Vec<(NominatorIndexCompact, ValidatorIndexCompact)>',
        votes2: 'Vec<(NominatorIndexCompact, CompactScoreCompact, ValidatorIndexCompact)>',
        votes3: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 2], ValidatorIndexCompact)>',
        votes4: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 3], ValidatorIndexCompact)>',
        votes5: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 4], ValidatorIndexCompact)>',
        votes6: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 5], ValidatorIndexCompact)>',
        votes7: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 6], ValidatorIndexCompact)>',
        votes8: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 7], ValidatorIndexCompact)>',
        votes9: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 8], ValidatorIndexCompact)>',
        votes10: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 9], ValidatorIndexCompact)>',
        votes11: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 10], ValidatorIndexCompact)>',
        votes12: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 11], ValidatorIndexCompact)>',
        votes13: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 12], ValidatorIndexCompact)>',
        votes14: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 13], ValidatorIndexCompact)>',
        votes15: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 14], ValidatorIndexCompact)>',
        votes16: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 15], ValidatorIndexCompact)>'
    },
    CompactAssignmentsWith24: {
        votes1: 'Vec<(NominatorIndexCompact, ValidatorIndexCompact)>',
        votes2: 'Vec<(NominatorIndexCompact, CompactScoreCompact, ValidatorIndexCompact)>',
        votes3: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 2], ValidatorIndexCompact)>',
        votes4: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 3], ValidatorIndexCompact)>',
        votes5: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 4], ValidatorIndexCompact)>',
        votes6: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 5], ValidatorIndexCompact)>',
        votes7: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 6], ValidatorIndexCompact)>',
        votes8: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 7], ValidatorIndexCompact)>',
        votes9: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 8], ValidatorIndexCompact)>',
        votes10: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 9], ValidatorIndexCompact)>',
        votes11: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 10], ValidatorIndexCompact)>',
        votes12: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 11], ValidatorIndexCompact)>',
        votes13: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 12], ValidatorIndexCompact)>',
        votes14: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 13], ValidatorIndexCompact)>',
        votes15: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 14], ValidatorIndexCompact)>',
        votes16: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 15], ValidatorIndexCompact)>',
        votes17: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 16], ValidatorIndexCompact)>',
        votes18: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 17], ValidatorIndexCompact)>',
        votes19: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 18], ValidatorIndexCompact)>',
        votes20: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 19], ValidatorIndexCompact)>',
        votes21: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 20], ValidatorIndexCompact)>',
        votes22: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 21], ValidatorIndexCompact)>',
        votes23: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 22], ValidatorIndexCompact)>',
        votes24: 'Vec<(NominatorIndexCompact, [CompactScoreCompact; 23], ValidatorIndexCompact)>'
    },
    CompactAssignmentsTo265: 'CompactAssignmentsWith16',
    CompactAssignmentsTo257: {
        votes1: 'Vec<(NominatorIndex, [CompactScore; 0], ValidatorIndex)>',
        votes2: 'Vec<(NominatorIndex, [CompactScore; 1], ValidatorIndex)>',
        votes3: 'Vec<(NominatorIndex, [CompactScore; 2], ValidatorIndex)>',
        votes4: 'Vec<(NominatorIndex, [CompactScore; 3], ValidatorIndex)>',
        votes5: 'Vec<(NominatorIndex, [CompactScore; 4], ValidatorIndex)>',
        votes6: 'Vec<(NominatorIndex, [CompactScore; 5], ValidatorIndex)>',
        votes7: 'Vec<(NominatorIndex, [CompactScore; 6], ValidatorIndex)>',
        votes8: 'Vec<(NominatorIndex, [CompactScore; 7], ValidatorIndex)>',
        votes9: 'Vec<(NominatorIndex, [CompactScore; 8], ValidatorIndex)>',
        votes10: 'Vec<(NominatorIndex, [CompactScore; 9], ValidatorIndex)>',
        votes11: 'Vec<(NominatorIndex, [CompactScore; 10], ValidatorIndex)>',
        votes12: 'Vec<(NominatorIndex, [CompactScore; 11], ValidatorIndex)>',
        votes13: 'Vec<(NominatorIndex, [CompactScore; 12], ValidatorIndex)>',
        votes14: 'Vec<(NominatorIndex, [CompactScore; 13], ValidatorIndex)>',
        votes15: 'Vec<(NominatorIndex, [CompactScore; 14], ValidatorIndex)>',
        votes16: 'Vec<(NominatorIndex, [CompactScore; 15], ValidatorIndex)>'
    },
    CompactScore: '(ValidatorIndex, OffchainAccuracy)',
    CompactScoreCompact: '(ValidatorIndexCompact, OffchainAccuracyCompact)',
    ElectionCompute: {
        // in previous versions the last entry was "AuthorityId"
        // (since no data attached, and it is via SCALE can rename)
        _enum: [
            'OnChain',
            'Signed',
            'Unsigned'
        ]
    },
    ElectionPhase: {
        _enum: {
            Off: null,
            Signed: null,
            Unsigned: '(bool, BlockNumber)',
            Emergency: null
        }
    },
    ElectionResult: {
        compute: 'ElectionCompute',
        slotStake: 'Balance',
        electedStashes: 'Vec<AccountId>',
        exposures: 'Vec<(AccountId, Exposure)>'
    },
    ElectionResultToSpec10: {
        electedStashes: 'Vec<AccountId>',
        exposures: 'Vec<(AccountId, Exposure<AccountId, Balance>)>',
        compute: 'ElectionCompute'
    },
    ElectionScore: '[u128; 3]',
    ElectionSize: {
        validators: 'Compact<ValidatorIndex>',
        nominators: 'Compact<NominatorIndex>'
    },
    ElectionStatus: {
        _enum: {
            Close: 'Null',
            Open: 'BlockNumber'
        }
    },
    ExtendedBalance: 'u128',
    RawSolution: 'RawSolutionWith16',
    RawSolutionWith16: {
        compact: 'CompactAssignmentsWith16',
        score: 'ElectionScore',
        round: 'u32'
    },
    RawSolutionWith24: {
        compact: 'CompactAssignmentsWith24',
        score: 'ElectionScore',
        round: 'u32'
    },
    RawSolutionTo265: 'RawSolutionWith16',
    ReadySolution: {
        supports: 'SolutionSupports',
        score: 'ElectionScore',
        compute: 'ElectionCompute'
    },
    RoundSnapshot: {
        voters: 'Vec<(AccountId, VoteWeight, Vec<AccountId>)>',
        targets: 'Vec<AccountId>'
    },
    SeatHolder: {
        who: 'AccountId',
        stake: 'Balance',
        deposit: 'Balance'
    },
    SignedSubmission: {
        _fallback: 'SignedSubmissionTo276',
        who: 'AccountId',
        deposit: 'Balance',
        solution: 'RawSolution',
        reward: 'Balance'
    },
    SignedSubmissionTo276: {
        who: 'AccountId',
        deposit: 'Balance',
        solution: 'RawSolution'
    },
    SignedSubmissionOf: 'SignedSubmission',
    SolutionOrSnapshotSize: {
        voters: 'Compact<u32>',
        targets: 'Compact<u32>'
    },
    SolutionSupport: {
        total: 'ExtendedBalance',
        voters: 'Vec<(AccountId, ExtendedBalance)>'
    },
    SolutionSupports: 'Vec<(AccountId, SolutionSupport)>',
    Supports: 'SolutionSupports',
    SubmissionIndicesOf: 'BTreeMap<ElectionScore, u32>',
    Voter: {
        votes: 'Vec<AccountId>',
        stake: 'Balance',
        deposit: 'Balance'
    },
    VoteWeight: 'u64'
};
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$staking$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        ...deprecated,
        ...phragmen,
        ActiveEraInfo: {
            index: 'EraIndex',
            start: 'Option<Moment>'
        },
        EraIndex: 'u32',
        EraRewardPoints: {
            total: 'RewardPoint',
            individual: 'BTreeMap<AccountId, RewardPoint>'
        },
        EraRewards: {
            total: 'u32',
            rewards: 'Vec<u32>'
        },
        Exposure: {
            total: 'Compact<Balance>',
            own: 'Compact<Balance>',
            others: 'Vec<IndividualExposure>'
        },
        Forcing: {
            _enum: [
                'NotForcing',
                'ForceNew',
                'ForceNone',
                'ForceAlways'
            ]
        },
        IndividualExposure: {
            who: 'AccountId',
            value: 'Compact<Balance>'
        },
        KeyType: 'AccountId',
        MomentOf: 'Moment',
        Nominations: {
            targets: 'Vec<AccountId>',
            submittedIn: 'EraIndex',
            suppressed: 'bool'
        },
        NominatorIndex: 'u32',
        NominatorIndexCompact: 'Compact<NominatorIndex>',
        OffchainAccuracy: 'PerU16',
        OffchainAccuracyCompact: 'Compact<OffchainAccuracy>',
        PhragmenScore: '[u128; 3]',
        Points: 'u32',
        RewardDestination: {
            _enum: {
                Staked: 'Null',
                Stash: 'Null',
                Controller: 'Null',
                Account: 'AccountId',
                None: 'Null'
            }
        },
        RewardPoint: 'u32',
        SlashJournalEntry: {
            who: 'AccountId',
            amount: 'Balance',
            ownSlash: 'Balance'
        },
        SlashingSpansTo204: {
            spanIndex: 'SpanIndex',
            lastStart: 'EraIndex',
            prior: 'Vec<EraIndex>'
        },
        SlashingSpans: {
            spanIndex: 'SpanIndex',
            lastStart: 'EraIndex',
            lastNonzeroSlash: 'EraIndex',
            prior: 'Vec<EraIndex>'
        },
        SpanIndex: 'u32',
        SpanRecord: {
            slashed: 'Balance',
            paidOut: 'Balance'
        },
        StakingLedgerTo223: {
            stash: 'AccountId',
            total: 'Compact<Balance>',
            active: 'Compact<Balance>',
            unlocking: 'Vec<UnlockChunk>'
        },
        StakingLedgerTo240: {
            _fallback: 'StakingLedgerTo223',
            stash: 'AccountId',
            total: 'Compact<Balance>',
            active: 'Compact<Balance>',
            unlocking: 'Vec<UnlockChunk>',
            lastReward: 'Option<EraIndex>'
        },
        StakingLedger: {
            stash: 'AccountId',
            total: 'Compact<Balance>',
            active: 'Compact<Balance>',
            unlocking: 'Vec<UnlockChunk>',
            claimedRewards: 'Vec<EraIndex>'
        },
        UnappliedSlashOther: '(AccountId, Balance)',
        UnappliedSlash: {
            validator: 'AccountId',
            own: 'Balance',
            others: 'Vec<UnappliedSlashOther>',
            reporters: 'Vec<AccountId>',
            payout: 'Balance'
        },
        UnlockChunk: {
            value: 'Compact<Balance>',
            era: 'Compact<BlockNumber>'
        },
        ValidatorIndex: 'u16',
        ValidatorIndexCompact: 'Compact<ValidatorIndex>',
        ValidatorPrefs: 'ValidatorPrefsWithBlocked',
        ValidatorPrefsWithCommission: {
            commission: 'Compact<Perbill>'
        },
        ValidatorPrefsWithBlocked: {
            commission: 'Compact<Perbill>',
            blocked: 'bool'
        },
        ValidatorPrefsTo196: {
            validatorPayment: 'Compact<Balance>'
        },
        ValidatorPrefsTo145: {
            unstakeThreshold: 'Compact<u32>',
            validatorPayment: 'Compact<Balance>'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/statement/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    ValidateStatement: [
        {
            methods: {
                valdate_statement: {
                    description: 'Validate the statement.',
                    params: [
                        {
                            name: 'source',
                            type: 'StatementStoreStatementSource'
                        },
                        {
                            name: 'statement',
                            type: 'SpStatementStoreStatement'
                        }
                    ],
                    type: 'Result<StatementStoreValidStatement, StatementStoreInvalidStatement>'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/statement/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$statement$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/statement/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$statement$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        StatementStoreStatementSource: {
            _enum: [
                'Chain',
                'Network',
                'Local'
            ]
        },
        StatementStoreValidStatement: {
            maxCount: 'u32',
            maxSize: 'u32'
        },
        StatementStoreInvalidStatement: {
            _enum: [
                'BadProof',
                'NoProof',
                'InternalError'
            ]
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/support/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        WeightToFeeCoefficient: {
            coeffInteger: 'Balance',
            coeffFrac: 'Perbill',
            negative: 'bool',
            degree: 'u8'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/syncstate/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    genSyncSpec: {
        description: 'Returns the json-serialized chainspec running the node, with a sync state.',
        endpoint: 'sync_state_genSyncSpec',
        params: [
            {
                name: 'raw',
                type: 'bool'
            }
        ],
        type: 'Json'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/syncstate/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$syncstate$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/syncstate/rpc.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$syncstate$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    types: {}
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/system/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    accountNextIndex: {
        alias: [
            'account_nextIndex'
        ],
        description: 'Retrieves the next accountIndex as available on the node',
        params: [
            {
                name: 'accountId',
                type: 'AccountId'
            }
        ],
        type: 'Index'
    },
    addLogFilter: {
        description: 'Adds the supplied directives to the current log filter',
        isUnsafe: true,
        params: [
            {
                name: 'directives',
                type: 'Text'
            }
        ],
        type: 'Null'
    },
    addReservedPeer: {
        description: 'Adds a reserved peer',
        isUnsafe: true,
        params: [
            {
                name: 'peer',
                type: 'Text'
            }
        ],
        type: 'Text'
    },
    chain: {
        description: 'Retrieves the chain',
        params: [],
        type: 'Text'
    },
    chainType: {
        description: 'Retrieves the chain type',
        params: [],
        type: 'ChainType'
    },
    dryRun: {
        alias: [
            'system_dryRunAt'
        ],
        description: 'Dry run an extrinsic at a given block',
        isUnsafe: true,
        params: [
            {
                name: 'extrinsic',
                type: 'Bytes'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'ApplyExtrinsicResult'
    },
    health: {
        description: 'Return health status of the node',
        noErrorLog: true,
        params: [],
        type: 'Health'
    },
    localListenAddresses: {
        description: 'The addresses include a trailing /p2p/ with the local PeerId, and are thus suitable to be passed to addReservedPeer or as a bootnode address for example',
        params: [],
        type: 'Vec<Text>'
    },
    localPeerId: {
        description: 'Returns the base58-encoded PeerId of the node',
        params: [],
        type: 'Text'
    },
    name: {
        description: 'Retrieves the node name',
        params: [],
        type: 'Text'
    },
    networkState: {
        alias: [
            'system_unstable_networkState'
        ],
        description: 'Returns current state of the network',
        isUnsafe: true,
        params: [],
        type: 'NetworkState'
    },
    nodeRoles: {
        description: 'Returns the roles the node is running as',
        params: [],
        type: 'Vec<NodeRole>'
    },
    peers: {
        description: 'Returns the currently connected peers',
        isUnsafe: true,
        params: [],
        type: 'Vec<PeerInfo>'
    },
    properties: {
        description: 'Get a custom set of properties as a JSON object, defined in the chain spec',
        params: [],
        type: 'ChainProperties'
    },
    removeReservedPeer: {
        description: 'Remove a reserved peer',
        isUnsafe: true,
        params: [
            {
                name: 'peerId',
                type: 'Text'
            }
        ],
        type: 'Text'
    },
    reservedPeers: {
        description: 'Returns the list of reserved peers',
        params: [],
        type: 'Vec<Text>'
    },
    resetLogFilter: {
        description: 'Resets the log filter to Substrate defaults',
        isUnsafe: true,
        params: [],
        type: 'Null'
    },
    syncState: {
        description: 'Returns the state of the syncing of the node',
        params: [],
        type: 'SyncState'
    },
    version: {
        description: 'Retrieves the version of the node',
        params: [],
        type: 'Text'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/system/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    AccountNonceApi: [
        {
            methods: {
                account_nonce: {
                    description: 'The API to query account nonce (aka transaction index)',
                    params: [
                        {
                            name: 'accountId',
                            type: 'AccountId'
                        }
                    ],
                    type: 'Index'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/system/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$system$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/system/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$system$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/system/runtime.js [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$system$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$system$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        AccountInfo: 'AccountInfoWithTripleRefCount',
        AccountInfoWithRefCountU8: {
            nonce: 'Index',
            refcount: 'u8',
            data: 'AccountData'
        },
        AccountInfoWithRefCount: {
            _fallback: 'AccountInfoWithRefCountU8',
            nonce: 'Index',
            refcount: 'RefCount',
            data: 'AccountData'
        },
        AccountInfoWithDualRefCount: {
            _fallback: 'AccountInfoWithRefCount',
            nonce: 'Index',
            consumers: 'RefCount',
            providers: 'RefCount',
            data: 'AccountData'
        },
        // original naming
        AccountInfoWithProviders: 'AccountInfoWithDualRefCount',
        AccountInfoWithTripleRefCount: {
            _fallback: 'AccountInfoWithDualRefCount',
            nonce: 'Index',
            consumers: 'RefCount',
            providers: 'RefCount',
            sufficients: 'RefCount',
            data: 'AccountData'
        },
        ApplyExtrinsicResult: 'Result<DispatchOutcome, TransactionValidityError>',
        ApplyExtrinsicResultPre6: 'Result<DispatchOutcomePre6, TransactionValidityError>',
        ArithmeticError: {
            _enum: [
                'Underflow',
                'Overflow',
                'DivisionByZero'
            ]
        },
        BlockLength: {
            max: 'PerDispatchClassU32'
        },
        BlockWeights: {
            baseBlock: 'Weight',
            maxBlock: 'Weight',
            perClass: 'PerDispatchClassWeightsPerClass'
        },
        ChainProperties: 'GenericChainProperties',
        ChainType: {
            _enum: {
                Development: 'Null',
                Local: 'Null',
                Live: 'Null',
                Custom: 'Text'
            }
        },
        ConsumedWeight: 'PerDispatchClassWeight',
        DigestOf: 'Digest',
        DispatchClass: {
            _enum: [
                'Normal',
                'Operational',
                'Mandatory'
            ]
        },
        DispatchError: {
            _enum: {
                Other: 'Null',
                CannotLookup: 'Null',
                BadOrigin: 'Null',
                Module: 'DispatchErrorModule',
                ConsumerRemaining: 'Null',
                NoProviders: 'Null',
                TooManyConsumers: 'Null',
                Token: 'TokenError',
                Arithmetic: 'ArithmeticError',
                Transactional: 'TransactionalError',
                Exhausted: 'Null',
                Corruption: 'Null',
                Unavailable: 'Null'
            }
        },
        DispatchErrorPre6: {
            _enum: {
                Other: 'Null',
                CannotLookup: 'Null',
                BadOrigin: 'Null',
                Module: 'DispatchErrorModulePre6',
                ConsumerRemaining: 'Null',
                NoProviders: 'Null',
                TooManyConsumers: 'Null',
                Token: 'TokenError',
                Arithmetic: 'ArithmeticError',
                Transactional: 'TransactionalError'
            }
        },
        DispatchErrorPre6First: {
            // The enum was modified mid-flight, affecting asset chains -
            // https://github.com/paritytech/substrate/pull/10382/files#diff-e4e016b33a82268b6208dc974eea841bad47597865a749fee2f937eb6fdf67b4R498
            _enum: {
                Other: 'Null',
                CannotLookup: 'Null',
                BadOrigin: 'Null',
                Module: 'DispatchErrorModulePre6',
                ConsumerRemaining: 'Null',
                NoProviders: 'Null',
                Token: 'TokenError',
                Arithmetic: 'ArithmeticError',
                Transactional: 'TransactionalError'
            }
        },
        DispatchErrorModuleU8: {
            index: 'u8',
            error: 'u8'
        },
        DispatchErrorModuleU8a: {
            index: 'u8',
            error: '[u8; 4]'
        },
        DispatchErrorModule: 'DispatchErrorModuleU8a',
        DispatchErrorModulePre6: 'DispatchErrorModuleU8',
        DispatchErrorTo198: {
            module: 'Option<u8>',
            error: 'u8'
        },
        DispatchInfo: {
            weight: 'Weight',
            class: 'DispatchClass',
            paysFee: 'Pays'
        },
        DispatchInfoTo190: {
            weight: 'Weight',
            class: 'DispatchClass'
        },
        DispatchInfoTo244: {
            weight: 'Weight',
            class: 'DispatchClass',
            paysFee: 'bool'
        },
        DispatchOutcome: 'Result<(), DispatchError>',
        DispatchOutcomePre6: 'Result<(), DispatchErrorPre6>',
        DispatchResult: 'Result<(), DispatchError>',
        DispatchResultOf: 'DispatchResult',
        DispatchResultTo198: 'Result<(), Text>',
        Event: 'GenericEvent',
        EventId: '[u8; 2]',
        EventIndex: 'u32',
        EventRecord: {
            phase: 'Phase',
            event: 'Event',
            topics: 'Vec<Hash>'
        },
        Health: {
            peers: 'u64',
            isSyncing: 'bool',
            shouldHavePeers: 'bool'
        },
        InvalidTransaction: {
            _enum: {
                Call: 'Null',
                Payment: 'Null',
                Future: 'Null',
                Stale: 'Null',
                BadProof: 'Null',
                AncientBirthBlock: 'Null',
                ExhaustsResources: 'Null',
                Custom: 'u8',
                BadMandatory: 'Null',
                MandatoryDispatch: 'Null',
                BadSigner: 'Null'
            }
        },
        Key: 'Bytes',
        LastRuntimeUpgradeInfo: {
            specVersion: 'Compact<u32>',
            specName: 'Text'
        },
        NetworkState: {
            peerId: 'Text',
            listenedAddresses: 'Vec<Text>',
            externalAddresses: 'Vec<Text>',
            connectedPeers: 'HashMap<Text, Peer>',
            notConnectedPeers: 'HashMap<Text, NotConnectedPeer>',
            averageDownloadPerSec: 'u64',
            averageUploadPerSec: 'u64',
            peerset: 'NetworkStatePeerset'
        },
        NetworkStatePeerset: {
            messageQueue: 'u64',
            nodes: 'HashMap<Text, NetworkStatePeersetInfo>'
        },
        NetworkStatePeersetInfo: {
            connected: 'bool',
            reputation: 'i32'
        },
        NodeRole: {
            _enum: {
                Full: 'Null',
                LightClient: 'Null',
                Authority: 'Null',
                UnknownRole: 'u8'
            }
        },
        NotConnectedPeer: {
            knownAddresses: 'Vec<Text>',
            latestPingTime: 'Option<PeerPing>',
            versionString: 'Option<Text>'
        },
        Peer: {
            enabled: 'bool',
            endpoint: 'PeerEndpoint',
            knownAddresses: 'Vec<Text>',
            latestPingTime: 'PeerPing',
            open: 'bool',
            versionString: 'Text'
        },
        PeerEndpoint: {
            listening: 'PeerEndpointAddr'
        },
        PeerEndpointAddr: {
            _alias: {
                localAddr: 'local_addr',
                sendBackAddr: 'send_back_addr'
            },
            localAddr: 'Text',
            sendBackAddr: 'Text'
        },
        PeerPing: {
            nanos: 'u64',
            secs: 'u64'
        },
        PeerInfo: {
            peerId: 'Text',
            roles: 'Text',
            protocolVersion: 'u32',
            bestHash: 'Hash',
            bestNumber: 'BlockNumber'
        },
        PerDispatchClassU32: {
            normal: 'u32',
            operational: 'u32',
            mandatory: 'u32'
        },
        PerDispatchClassWeight: {
            normal: 'Weight',
            operational: 'Weight',
            mandatory: 'Weight'
        },
        PerDispatchClassWeightsPerClass: {
            normal: 'WeightPerClass',
            operational: 'WeightPerClass',
            mandatory: 'WeightPerClass'
        },
        Phase: {
            _enum: {
                ApplyExtrinsic: 'u32',
                Finalization: 'Null',
                Initialization: 'Null'
            }
        },
        RawOrigin: {
            _enum: {
                Root: 'Null',
                Signed: 'AccountId',
                None: 'Null'
            }
        },
        RefCount: 'u32',
        RefCountTo259: 'u8',
        SyncState: {
            startingBlock: 'BlockNumber',
            currentBlock: 'BlockNumber',
            highestBlock: 'Option<BlockNumber>'
        },
        SystemOrigin: 'RawOrigin',
        TokenError: {
            _enum: [
                'NoFunds',
                'WouldDie',
                'BelowMinimum',
                'CannotCreate',
                'UnknownAsset',
                'Frozen',
                'Unsupported',
                // these are dropped, but still in older versions
                // (if this adjusts, will need to take a re-look)
                'Underflow',
                'Overflow'
            ]
        },
        TransactionValidityError: {
            _enum: {
                Invalid: 'InvalidTransaction',
                Unknown: 'UnknownTransaction'
            }
        },
        TransactionalError: {
            _enum: [
                'LimitReached',
                'NoLayer'
            ]
        },
        UnknownTransaction: {
            _enum: {
                CannotLookup: 'Null',
                NoUnsignedValidator: 'Null',
                Custom: 'u8'
            }
        },
        WeightPerClass: {
            baseExtrinsic: 'Weight',
            maxExtrinsic: 'Option<Weight>',
            maxTotal: 'Option<Weight>',
            reserved: 'Option<Weight>'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/treasury/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        Bounty: {
            proposer: 'AccountId',
            value: 'Balance',
            fee: 'Balance',
            curatorDeposit: 'Balance',
            bond: 'Balance',
            status: 'BountyStatus'
        },
        BountyIndex: 'u32',
        BountyStatus: {
            _enum: {
                Proposed: 'Null',
                Approved: 'Null',
                Funded: 'Null',
                CuratorProposed: 'BountyStatusCuratorProposed',
                Active: 'BountyStatusActive',
                PendingPayout: 'BountyStatusPendingPayout'
            }
        },
        BountyStatusActive: {
            curator: 'AccountId',
            updateDue: 'BlockNumber'
        },
        BountyStatusCuratorProposed: {
            curator: 'AccountId'
        },
        BountyStatusPendingPayout: {
            curator: 'AccountId',
            beneficiary: 'AccountId',
            unlockAt: 'BlockNumber'
        },
        OpenTip: {
            reason: 'Hash',
            who: 'AccountId',
            finder: 'AccountId',
            deposit: 'Balance',
            closes: 'Option<BlockNumber>',
            tips: 'Vec<OpenTipTip>',
            findersFee: 'bool'
        },
        OpenTipTo225: {
            reason: 'Hash',
            who: 'AccountId',
            finder: 'Option<OpenTipFinderTo225>',
            closes: 'Option<BlockNumber>',
            tips: 'Vec<OpenTipTip>'
        },
        OpenTipFinderTo225: '(AccountId, Balance)',
        OpenTipTip: '(AccountId, Balance)',
        TreasuryProposal: {
            proposer: 'AccountId',
            value: 'Balance',
            beneficiary: 'AccountId',
            bond: 'Balance'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/txpayment/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        Multiplier: 'Fixed128'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/txqueue/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    TaggedTransactionQueue: [
        {
            methods: {
                validate_transaction: {
                    description: 'Validate the transaction.',
                    params: [
                        {
                            name: 'source',
                            type: 'TransactionSource'
                        },
                        {
                            name: 'tx',
                            type: 'Extrinsic'
                        },
                        {
                            name: 'blockHash',
                            type: 'BlockHash'
                        }
                    ],
                    type: 'TransactionValidity'
                }
            },
            version: 3
        },
        {
            methods: {
                validate_transaction: {
                    description: 'Validate the transaction.',
                    params: [
                        {
                            name: 'source',
                            type: 'TransactionSource'
                        },
                        {
                            name: 'tx',
                            type: 'Extrinsic'
                        }
                    ],
                    type: 'TransactionValidity'
                }
            },
            version: 2
        },
        {
            methods: {
                validate_transaction: {
                    description: 'Validate the transaction.',
                    params: [
                        {
                            name: 'tx',
                            type: 'Extrinsic'
                        }
                    ],
                    type: 'TransactionValidity'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/txqueue/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$txqueue$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/txqueue/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$txqueue$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        TransactionSource: {
            _enum: [
                'InBlock',
                'Local',
                'External'
            ]
        },
        TransactionValidity: 'Result<ValidTransaction, TransactionValidityError>',
        ValidTransaction: {
            priority: 'TransactionPriority',
            requires: 'Vec<TransactionTag>',
            provides: 'Vec<TransactionTag>',
            longevity: 'TransactionLongevity',
            propagate: 'bool'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/uniques/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        ClassId: 'u32',
        InstanceId: 'u32',
        DepositBalance: 'Balance',
        DepositBalanceOf: 'Balance',
        ClassDetails: {
            owner: 'AccountId',
            issuer: 'AccountId',
            admin: 'AccountId',
            freezer: 'AccountId',
            totalDeposit: 'DepositBalance',
            freeHolding: 'bool',
            instances: 'u32',
            instanceMetadatas: 'u32',
            attributes: 'u32',
            isFrozen: 'bool'
        },
        DestroyWitness: {
            instances: 'Compact<u32>',
            instanceMetadatas: 'Compact<u32>',
            attributes: 'Compact<u32>'
        },
        InstanceDetails: {
            owner: 'AccountId',
            approved: 'Option<AccountId>',
            isFrozen: 'bool',
            deposit: 'DepositBalance'
        },
        ClassMetadata: {
            deposit: 'DepositBalance',
            data: 'Vec<u8>',
            isFrozen: 'bool'
        },
        InstanceMetadata: {
            deposit: 'DepositBalance',
            data: 'Vec<u8>',
            isFrozen: 'bool'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/utility/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        Multisig: {
            when: 'Timepoint',
            deposit: 'Balance',
            depositor: 'AccountId',
            approvals: 'Vec<AccountId>'
        },
        Timepoint: {
            height: 'BlockNumber',
            index: 'u32'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/vesting/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        VestingInfo: {
            locked: 'Balance',
            perBlock: 'Balance',
            startingBlock: 'BlockNumber'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/attestations/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        BlockAttestations: {
            receipt: 'CandidateReceipt',
            valid: 'Vec<AccountId>',
            invalid: 'Vec<AccountId>'
        },
        IncludedBlocks: {
            actualNumber: 'BlockNumber',
            session: 'SessionIndex',
            randomSeed: 'H256',
            activeParachains: 'Vec<ParaId>',
            paraBlocks: 'Vec<Hash>'
        },
        MoreAttestations: {}
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/bridges/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        BridgedBlockHash: 'H256',
        BridgedBlockNumber: 'BlockNumber',
        BridgedHeader: 'Header',
        BridgeMessageId: '(LaneId, MessageNonce)',
        CallOrigin: {
            _enum: {
                SourceRoot: 'Null',
                TargetAccount: '(AccountId, MultiSigner, MultiSignature)',
                SourceAccount: 'AccountId'
            }
        },
        ChainId: '[u8; 4]',
        DeliveredMessages: {
            begin: 'MessageNonce',
            end: 'MessageNonce',
            // pub type DispatchResultsBitVec = BitVec<Msb0, u8>;
            dispatchResults: 'BitVec'
        },
        DispatchFeePayment: {
            _enum: [
                'AtSourceChain',
                'AtTargetChain'
            ]
        },
        InboundLaneData: {
            relayers: 'Vec<UnrewardedRelayer>',
            lastConfirmedNonce: 'MessageNonce'
        },
        InboundRelayer: 'AccountId',
        InitializationData: {
            header: 'Header',
            authorityList: 'AuthorityList',
            setId: 'SetId',
            isHalted: 'bool'
        },
        LaneId: '[u8; 4]',
        MessageData: {
            payload: 'Bytes',
            fee: 'Balance'
        },
        MessagesDeliveryProofOf: {
            bridgedHeaderHash: 'BlockHash',
            storageProof: 'Vec<Bytes>',
            lane: 'LaneId'
        },
        MessageKey: {
            laneId: 'LaneId',
            nonce: 'MessageNonce'
        },
        MessageNonce: 'u64',
        MessagesProofOf: {
            bridgedHeaderHash: 'BridgedBlockHash',
            storageProof: 'Vec<Bytes>',
            lane: 'LaneId',
            noncesStart: 'MessageNonce',
            noncesEnd: 'MessageNonce'
        },
        OperatingMode: {
            _enum: [
                'Normal',
                'RejectingOutboundMessages',
                'Halted'
            ]
        },
        OutboundLaneData: {
            oldestUnprunedNonce: 'MessageNonce',
            latestReceivedNonce: 'MessageNonce',
            latestGeneratedNonce: 'MessageNonce'
        },
        OutboundMessageFee: 'Balance',
        OutboundPayload: {
            specVersion: 'u32',
            weight: 'Weight',
            origin: 'CallOrigin',
            dispatchFeePayment: 'DispatchFeePayment',
            call: 'Bytes'
        },
        Parameter: 'Null',
        RelayerId: 'AccountId',
        UnrewardedRelayer: {
            relayer: 'RelayerId',
            messages: 'DeliveredMessages'
        },
        UnrewardedRelayersState: {
            unrewardedRelayer_Entries: 'MessageNonce',
            messagesInOldestEntry: 'MessageNonce',
            totalMessages: 'MessageNonce'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/claims/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        StatementKind: {
            _enum: [
                'Regular',
                'Saft'
            ]
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/crowdloan/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        FundIndex: 'u32',
        LastContribution: {
            _enum: {
                Never: 'Null',
                PreEnding: 'u32',
                Ending: 'BlockNumber'
            }
        },
        FundInfo: {
            depositor: 'AccountId',
            verifier: 'Option<MultiSigner>',
            deposit: 'Balance',
            raised: 'Balance',
            end: 'BlockNumber',
            cap: 'Balance',
            lastContribution: 'LastContribution',
            firstPeriod: 'LeasePeriod',
            lastPeriod: 'LeasePeriod',
            trieIndex: 'TrieIndex'
        },
        TrieIndex: 'u32'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/cumulus/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    AuraUnincludedSegmentApi: [
        {
            methods: {
                can_build_upon: {
                    description: 'Whether it is legal to extend the chain',
                    params: [
                        {
                            name: 'includedHash',
                            type: 'BlockHash'
                        },
                        {
                            name: 'slot',
                            type: 'Slot'
                        }
                    ],
                    type: 'bool'
                }
            },
            version: 1
        }
    ],
    CollectCollationInfo: [
        {
            methods: {
                collect_collation_info: {
                    description: 'Collect information about a collation.',
                    params: [
                        {
                            name: 'header',
                            type: 'Header'
                        }
                    ],
                    type: 'CollationInfo'
                }
            },
            version: 2
        },
        {
            methods: {
                collect_collation_info: {
                    description: 'Collect information about a collation.',
                    params: [],
                    type: 'CollationInfoV1'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/cumulus/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$cumulus$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/cumulus/runtime.js [app-client] (ecmascript)");
;
const dmpQueue = {
    CollationInfo: {
        upwardMessages: 'Vec<UpwardMessage>',
        horizontalMessages: 'Vec<OutboundHrmpMessage>',
        newValidationCode: 'Option<ValidationCode>',
        processedDownwardMessages: 'u32',
        hrmpWatermark: 'RelayBlockNumber',
        headData: 'HeadData'
    },
    CollationInfoV1: {
        upwardMessages: 'Vec<UpwardMessage>',
        horizontalMessages: 'Vec<OutboundHrmpMessage>',
        newValidationCode: 'Option<ValidationCode>',
        processedDownwardMessages: 'u32',
        hrmpWatermark: 'RelayBlockNumber'
    },
    ConfigData: {
        maxIndividual: 'Weight'
    },
    MessageId: '[u8; 32]',
    OverweightIndex: 'u64',
    PageCounter: 'u32',
    PageIndexData: {
        beginUsed: 'PageCounter',
        endUsed: 'PageCounter',
        overweightCount: 'OverweightIndex'
    }
};
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$cumulus$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: dmpQueue
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/finality/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const finalityV1 = {
    methods: {
        best_finalized: {
            description: 'Returns number and hash of the best finalized header known to the bridge module.',
            params: [],
            type: '(BlockNumber, Hash)'
        }
    },
    version: 1
};
const runtime = {
    KusamaFinalityApi: [
        finalityV1
    ],
    PolkadotFinalityApi: [
        finalityV1
    ],
    RococoFinalityApi: [
        finalityV1
    ],
    WestendFinalityApi: [
        finalityV1
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/finality/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$finality$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/finality/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$finality$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {}
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/parachains/hrmp.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable sort-keys */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    HrmpChannel: {
        maxCapacity: 'u32',
        maxTotalSize: 'u32',
        maxMessageSize: 'u32',
        msgCount: 'u32',
        totalSize: 'u32',
        mqcHead: 'Option<Hash>',
        senderDeposit: 'Balance',
        recipientDeposit: 'Balance'
    },
    HrmpChannelId: {
        sender: 'u32',
        receiver: 'u32'
    },
    HrmpOpenChannelRequest: {
        confirmed: 'bool',
        age: 'SessionIndex',
        senderDeposit: 'Balance',
        maxMessageSize: 'u32',
        maxCapacity: 'u32',
        maxTotalSize: 'u32'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/parachains/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const PH_V1_TO_V2 = {
    assumed_validation_data: {
        description: 'Returns the persisted validation data for the given `ParaId` along with the corresponding validation code hash.',
        params: [
            {
                name: 'paraId',
                type: 'ParaId'
            },
            {
                name: 'hash',
                type: 'Hash'
            }
        ],
        type: 'Option<(PersistedValidationData, ValidationCodeHash)>'
    },
    availability_cores: {
        description: 'Yields information on all availability cores as relevant to the child block.',
        params: [],
        type: 'Vec<CoreState>'
    },
    candidate_events: {
        description: 'Get a vector of events concerning candidates that occurred within a block.',
        params: [],
        type: 'Vec<CandidateEvent>'
    },
    candidate_pending_availability: {
        description: 'Get the receipt of a candidate pending availability.',
        params: [
            {
                name: 'paraId',
                type: 'ParaId'
            }
        ],
        type: 'Option<CommittedCandidateReceipt>'
    },
    check_validation_outputs: {
        description: 'Checks if the given validation outputs pass the acceptance criteria.',
        params: [
            {
                name: 'paraId',
                type: 'ParaId'
            },
            {
                name: 'outputs',
                type: 'CandidateCommitments'
            }
        ],
        type: 'bool'
    },
    dmq_contents: {
        description: 'Get all the pending inbound messages in the downward message queue for a para.',
        params: [
            {
                name: 'paraId',
                type: 'ParaId'
            }
        ],
        type: 'Vec<InboundDownwardMessage>'
    },
    inbound_hrmp_channels_contents: {
        description: 'Get the contents of all channels addressed to the given recipient.',
        params: [
            {
                name: 'paraId',
                type: 'ParaId'
            }
        ],
        type: 'Vec<InboundHrmpMessage>'
    },
    on_chain_votes: {
        description: 'Scrape dispute relevant from on-chain, backing votes and resolved disputes.',
        params: [],
        type: 'Option<ScrapedOnChainVotes>'
    },
    persisted_validation_data: {
        description: 'Yields the persisted validation data for the given `ParaId` along with an assumption that should be used if the para currently occupies a core.',
        params: [
            {
                name: 'paraId',
                type: 'ParaId'
            },
            {
                name: 'assumption',
                type: 'OccupiedCoreAssumption'
            }
        ],
        type: 'Option<PersistedValidationData>'
    },
    session_index_for_child: {
        description: 'Returns the session index expected at a child of the block.',
        params: [],
        type: 'SessionIndex'
    },
    validation_code: {
        description: 'Fetch the validation code used by a para, making the given `OccupiedCoreAssumption`.',
        params: [
            {
                name: 'paraId',
                type: 'ParaId'
            },
            {
                name: 'assumption',
                type: 'OccupiedCoreAssumption'
            }
        ],
        type: 'Option<ValidationCode>'
    },
    validation_code_by_hash: {
        description: 'Get the validation code from its hash.',
        params: [
            {
                name: 'hash',
                type: 'ValidationCodeHash'
            }
        ],
        type: 'Option<ValidationCode>'
    },
    validator_groups: {
        description: 'Returns the validator groups and rotation info localized based on the hypothetical child of a block whose state  this is invoked on',
        params: [],
        type: '(Vec<Vec<ParaValidatorIndex>>, GroupRotationInfo)'
    },
    validators: {
        description: 'Get the current validators.',
        params: [],
        type: 'Vec<ValidatorId>'
    }
};
const PH_V2_TO_V3 = {
    pvfs_require_precheck: {
        description: 'Returns code hashes of PVFs that require pre-checking by validators in the active set.',
        params: [],
        type: 'Vec<ValidationCodeHash>'
    },
    session_info: {
        description: 'Get the session info for the given session, if stored.',
        params: [
            {
                name: 'index',
                type: 'SessionIndex'
            }
        ],
        type: 'Option<SessionInfo>'
    },
    submit_pvf_check_statement: {
        description: 'Submits a PVF pre-checking statement into the transaction pool.',
        params: [
            {
                name: 'stmt',
                type: 'PvfCheckStatement'
            },
            {
                name: 'signature',
                type: 'ValidatorSignature'
            }
        ],
        type: 'Null'
    },
    validation_code_hash: {
        description: 'Fetch the hash of the validation code used by a para, making the given `OccupiedCoreAssumption`.',
        params: [
            {
                name: 'paraId',
                type: 'ParaId'
            },
            {
                name: 'assumption',
                type: 'OccupiedCoreAssumption'
            }
        ],
        type: 'Option<ValidationCodeHash>'
    }
};
const PH_V3 = {
    disputes: {
        description: 'Returns all onchain disputes.',
        params: [],
        type: 'Vec<(SessionIndex, CandidateHash, DisputeState)>'
    }
};
const PH_V4 = {
    session_executor_params: {
        description: 'Returns execution parameters for the session.',
        params: [
            {
                name: 'sessionIndex',
                type: 'SessionIndex'
            }
        ],
        type: 'Option<ExecutorParams>'
    }
};
const PH_V5 = {
    key_ownership_proof: {
        description: 'Returns a merkle proof of a validator session key',
        params: [
            {
                name: 'validatorId',
                type: 'ValidatorId'
            }
        ],
        type: 'Option<OpaqueKeyOwnershipProof>'
    },
    submit_report_dispute_lost: {
        description: 'Submit an unsigned extrinsic to slash validators who lost a dispute about a candidate of a past session',
        params: [
            {
                name: 'disputeProof',
                type: 'DisputeProof'
            },
            {
                name: 'keyOwnershipProof',
                type: 'OpaqueKeyOwnershipProof'
            }
        ],
        type: 'Option<Null>'
    },
    unapplied_slashes: {
        description: 'Returns a list of validators that lost a past session dispute and need to be slashed',
        params: [],
        type: 'Vec<(SessionIndex, CandidateHash, PendingSlashes)>'
    }
};
const PH_V6 = {
    minimum_backing_votes: {
        description: 'Get the minimum number of backing votes for a parachain candidate. This is a staging method! Do not use on production runtimes!',
        params: [],
        type: 'u32'
    }
};
const PH_V7 = {
    async_backing_params: {
        description: 'Returns candidate\'s acceptance limitations for asynchronous backing for a relay parent',
        params: [],
        type: 'AsyncBackingParams'
    },
    para_backing_state: {
        description: 'Returns the state of parachain backing for a given para',
        params: [
            {
                name: 'paraId',
                type: 'ParaId'
            }
        ],
        type: 'Option<BackingState>'
    }
};
const PH_V8 = {
    disabled_validators: {
        description: 'Returns a list of all disabled validators at the given block',
        params: [],
        type: 'ValidatorIndex'
    }
};
const PH_V9 = {
    node_features: {
        description: 'Get node features. This is a staging method! Do not use on production runtimes!',
        params: [],
        type: 'NodeFeatures'
    }
};
const PH_V10 = {
    approval_voting_params: {
        description: 'Approval voting configuration parameters',
        params: [],
        type: 'ApprovalVotingParams'
    }
};
const PH_V11 = {
    claim_queue: {
        description: 'Claim queue',
        params: [],
        type: 'BTreeMap<CoreIndex, Vec<u32>>'
    }
};
const runtime = {
    ParachainHost: [
        {
            methods: {
                ...PH_V1_TO_V2,
                ...PH_V2_TO_V3,
                ...PH_V3,
                ...PH_V4,
                ...PH_V5,
                ...PH_V6,
                ...PH_V7,
                ...PH_V8,
                ...PH_V9,
                ...PH_V10,
                ...PH_V11
            },
            version: 11
        },
        {
            methods: {
                ...PH_V1_TO_V2,
                ...PH_V2_TO_V3,
                ...PH_V3,
                ...PH_V4,
                ...PH_V5,
                ...PH_V6,
                ...PH_V7,
                ...PH_V8,
                ...PH_V9,
                ...PH_V10
            },
            version: 10
        },
        {
            methods: {
                ...PH_V1_TO_V2,
                ...PH_V2_TO_V3,
                ...PH_V3,
                ...PH_V4,
                ...PH_V5,
                ...PH_V6,
                ...PH_V7,
                ...PH_V8,
                ...PH_V9
            },
            version: 9
        },
        {
            methods: {
                ...PH_V1_TO_V2,
                ...PH_V2_TO_V3,
                ...PH_V3,
                ...PH_V4,
                ...PH_V5,
                ...PH_V6,
                ...PH_V7,
                ...PH_V8
            },
            version: 8
        },
        {
            methods: {
                ...PH_V1_TO_V2,
                ...PH_V2_TO_V3,
                ...PH_V3,
                ...PH_V4,
                ...PH_V5,
                ...PH_V6,
                ...PH_V7
            },
            version: 7
        },
        {
            methods: {
                ...PH_V1_TO_V2,
                ...PH_V2_TO_V3,
                ...PH_V3,
                ...PH_V4,
                ...PH_V5,
                ...PH_V6
            },
            version: 6
        },
        {
            methods: {
                ...PH_V1_TO_V2,
                ...PH_V2_TO_V3,
                ...PH_V3,
                ...PH_V4,
                ...PH_V5
            },
            version: 5
        },
        {
            methods: {
                ...PH_V1_TO_V2,
                ...PH_V2_TO_V3,
                ...PH_V3,
                ...PH_V4
            },
            version: 4
        },
        {
            methods: {
                ...PH_V1_TO_V2,
                ...PH_V2_TO_V3,
                ...PH_V3
            },
            version: 3
        },
        {
            methods: {
                ...PH_V1_TO_V2,
                ...PH_V2_TO_V3
            },
            version: 2
        },
        {
            methods: {
                session_info: {
                    description: 'Get the session info for the given session, if stored.',
                    params: [
                        {
                            name: 'index',
                            type: 'SessionIndex'
                        }
                    ],
                    type: 'Option<OldV1SessionInfo>'
                },
                ...PH_V1_TO_V2
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/parachains/slots.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
/* eslint-disable sort-keys */ const SlotRange10 = {
    _enum: [
        'ZeroZero',
        'ZeroOne',
        'ZeroTwo',
        'ZeroThree',
        'OneOne',
        'OneTwo',
        'OneThree',
        'TwoTwo',
        'TwoThree',
        'ThreeThree'
    ]
};
const SlotRange = {
    _enum: [
        'ZeroZero',
        'ZeroOne',
        'ZeroTwo',
        'ZeroThree',
        'ZeroFour',
        'ZeroFive',
        'ZeroSix',
        'ZeroSeven',
        'OneOne',
        'OneTwo',
        'OneThree',
        'OneFour',
        'OneFive',
        'OneSix',
        'OneSeven',
        'TwoTwo',
        'TwoThree',
        'TwoFour',
        'TwoFive',
        'TwoSix',
        'TwoSeven',
        'ThreeThree',
        'ThreeFour',
        'ThreeFive',
        'ThreeSix',
        'ThreeSeven',
        'FourFour',
        'FourFive',
        'FourSix',
        'FourSeven',
        'FiveFive',
        'FiveSix',
        'FiveSeven',
        'SixSix',
        'SixSeven',
        'SevenSeven'
    ]
};
const oldTypes = {
    Bidder: {
        _enum: {
            New: 'NewBidder',
            Existing: 'ParaId'
        }
    },
    IncomingParachain: {
        _enum: {
            Unset: 'NewBidder',
            Fixed: 'IncomingParachainFixed',
            Deploy: 'IncomingParachainDeploy'
        }
    },
    IncomingParachainDeploy: {
        code: 'ValidationCode',
        initialHeadData: 'HeadData'
    },
    IncomingParachainFixed: {
        codeHash: 'Hash',
        codeSize: 'u32',
        initialHeadData: 'HeadData'
    },
    NewBidder: {
        who: 'AccountId',
        sub: 'SubId'
    },
    SubId: 'u32'
};
const __TURBOPACK__default__export__ = {
    ...oldTypes,
    AuctionIndex: 'u32',
    LeasePeriod: 'BlockNumber',
    LeasePeriodOf: 'BlockNumber',
    SlotRange10,
    SlotRange,
    WinningData10: `[WinningDataEntry; ${SlotRange10._enum.length}]`,
    WinningData: `[WinningDataEntry; ${SlotRange._enum.length}]`,
    WinningDataEntry: 'Option<(AccountId, ParaId, BalanceOf)>',
    WinnersData10: 'Vec<WinnersDataTuple10>',
    WinnersData: 'Vec<WinnersDataTuple>',
    WinnersDataTuple10: '(AccountId, ParaId, BalanceOf, SlotRange10)',
    WinnersDataTuple: '(AccountId, ParaId, BalanceOf, SlotRange)'
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/parachains/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$parachains$2f$hrmp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/parachains/hrmp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$parachains$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/parachains/runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$parachains$2f$slots$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/parachains/slots.js [app-client] (ecmascript)");
;
;
;
const proposeTypes = {
    ParachainProposal: {
        proposer: 'AccountId',
        genesisHead: 'HeadData',
        validators: 'Vec<ValidatorId>',
        name: 'Bytes',
        balance: 'Balance'
    },
    RegisteredParachainInfo: {
        validators: 'Vec<ValidatorId>',
        proposer: 'AccountId'
    }
};
const cumulusTypes = {
    ServiceQuality: {
        _enum: [
            'Ordered',
            'Fast'
        ]
    }
};
const disputeTypes = {
    DisputeLocation: {
        _enum: [
            'Local',
            'Remote'
        ]
    },
    DisputeResult: {
        _enum: [
            'Valid',
            'Invalid'
        ]
    },
    DisputeState: {
        validatorsFor: 'BitVec',
        validatorsAgainst: 'BitVec',
        start: 'BlockNumber',
        concludedAt: 'Option<BlockNumber>'
    },
    DisputeStatement: {
        _enum: {
            Valid: 'ValidDisputeStatementKind',
            Invalid: 'InvalidDisputeStatementKind'
        }
    },
    DisputeStatementSet: {
        candidateHash: 'CandidateHash',
        session: 'SessionIndex',
        statements: 'Vec<(DisputeStatement, ParaValidatorIndex, ValidatorSignature)>'
    },
    ExecutorParam: {
        _enum: {
            Phantom: 'Null',
            MaxMemoryPages: 'u32',
            StackLogicalMax: 'u32',
            StackNativeMax: 'u32',
            PrecheckingMaxMemory: 'u64',
            PvfPrepTimeout: '(PvfPrepTimeoutKind, u64)',
            PvfExecTimeout: '(PvfExecTimeoutKind, u64)'
        }
    },
    ExecutorParamsHash: 'Hash',
    ExecutorParams: 'Vec<ExecutorParam>',
    ExplicitDisputeStatement: {
        valid: 'bool',
        candidateHash: 'CandidateHash',
        session: 'SessionIndex'
    },
    InvalidDisputeStatementKind: {
        _enum: [
            'Explicit'
        ]
    },
    MultiDisputeStatementSet: 'Vec<DisputeStatementSet>',
    PvfExecTimeoutKind: {
        _enum: [
            'Backing',
            'Approval'
        ]
    },
    PvfPrepTimeoutKind: {
        _enum: [
            'Precheck',
            'Lenient'
        ]
    },
    ValidDisputeStatementKind: {
        _enum: {
            Explicit: 'Null',
            BackingSeconded: 'Hash',
            BackingValid: 'Hash',
            ApprovalChecking: 'Null'
        }
    }
};
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$parachains$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        ...cumulusTypes,
        ...disputeTypes,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$parachains$2f$hrmp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        ...proposeTypes,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$parachains$2f$slots$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        AbridgedCandidateReceipt: {
            parachainIndex: 'ParaId',
            relayParent: 'Hash',
            headData: 'HeadData',
            collator: 'CollatorId',
            signature: 'CollatorSignature',
            povBlockHash: 'Hash',
            commitments: 'CandidateCommitments'
        },
        AbridgedHostConfiguration: {
            maxCodeSize: 'u32',
            maxHeadDataSize: 'u32',
            maxUpwardQueueCount: 'u32',
            maxUpwardQueueSize: 'u32',
            maxUpwardMessageSize: 'u32',
            maxUpwardMessageNumPerCandidate: 'u32',
            hrmpMaxMessageNumPerCandidate: 'u32',
            validationUpgradeFrequency: 'BlockNumber',
            validationUpgradeDelay: 'BlockNumber'
        },
        AbridgedHrmpChannel: {
            maxCapacity: 'u32',
            maxTotalSize: 'u32',
            maxMessageSize: 'u32',
            msgCount: 'u32',
            totalSize: 'u32',
            mqcHead: 'Option<Hash>'
        },
        ApprovalVotingParams: {
            maxApprovalCoalesceCount: 'u32'
        },
        AssignmentId: 'AccountId',
        AssignmentKind: {
            _enum: {
                Parachain: 'Null',
                Parathread: '(CollatorId, u32)'
            }
        },
        AsyncBackingParams: {
            maxCandidateDepth: 'u32',
            allowedAncestryLen: 'u32'
        },
        AttestedCandidate: {
            candidate: 'AbridgedCandidateReceipt',
            validityVotes: 'Vec<ValidityAttestation>',
            validatorIndices: 'BitVec'
        },
        AuthorityDiscoveryId: 'AccountId',
        AvailabilityBitfield: 'BitVec',
        AvailabilityBitfieldRecord: {
            bitfield: 'AvailabilityBitfield',
            submittedTt: 'BlockNumber'
        },
        BackedCandidate: {
            candidate: 'CommittedCandidateReceipt',
            validityVotes: 'Vec<ValidityAttestation>',
            validatorIndices: 'BitVec'
        },
        BackingState: {
            constraints: 'Constraints',
            pendingAvailability: 'Vec<CandidatePendingAvailability>'
        },
        BufferedSessionChange: {
            applyAt: 'BlockNumber',
            validators: 'Vec<ValidatorId>',
            queued: 'Vec<ValidatorId>',
            sessionIndex: 'SessionIndex'
        },
        CandidateCommitments: {
            upwardMessages: 'Vec<UpwardMessage>',
            horizontalMessages: 'Vec<OutboundHrmpMessage>',
            newValidationCode: 'Option<ValidationCode>',
            headData: 'HeadData',
            processedDownwardMessages: 'u32',
            hrmpWatermark: 'BlockNumber'
        },
        CandidateDescriptor: {
            paraId: 'ParaId',
            relayParent: 'RelayChainHash',
            collatorId: 'CollatorId',
            persistedValidationDataHash: 'Hash',
            povHash: 'Hash',
            erasureRoot: 'Hash',
            signature: 'CollatorSignature',
            paraHead: 'Hash',
            validationCodeHash: 'ValidationCodeHash'
        },
        CandidateEvent: {
            _enum: {
                CandidateBacked: '(CandidateReceipt, HeadData, CoreIndex, GroupIndex)',
                CandidateIncluded: '(CandidateReceipt, HeadData, CoreIndex, GroupIndex)',
                CandidateTimedOut: '(CandidateReceipt, HeadData, CoreIndex)'
            }
        },
        CandidateHash: 'Hash',
        CandidateInfo: {
            who: 'AccountId',
            deposit: 'Balance'
        },
        CandidatePendingAvailability: {
            core: 'CoreIndex',
            hash: 'CandidateHash',
            descriptor: 'CandidateDescriptor',
            availabilityVotes: 'BitVec',
            backers: 'BitVec',
            relayParentNumber: 'BlockNumber',
            backedInNumber: 'BlockNumber',
            backingGroup: 'GroupIndex'
        },
        CandidateReceipt: {
            descriptor: 'CandidateDescriptor',
            commitmentsHash: 'Hash'
        },
        GlobalValidationData: {
            maxCodeSize: 'u32',
            maxHeadDataSize: 'u32',
            blockNumber: 'BlockNumber'
        },
        CollatorId: 'H256',
        CollatorSignature: 'Signature',
        CommittedCandidateReceipt: {
            descriptor: 'CandidateDescriptor',
            commitments: 'CandidateCommitments'
        },
        Constraints: {
            minRelayParentNumber: 'BlockNumber',
            maxPovSize: 'u32',
            maxCodeSize: 'u32',
            umpRemaining: 'u32',
            umpRemainingBytes: 'u32',
            maxUmpNumPerCandidate: 'u32',
            dmpRemainingMessages: 'Vec<BlockNumber>',
            hrmpInbound: 'InboundHrmpLimitations',
            hrmpChannelsOut: 'HashMap<ParaId, OutboundHrmpChannelLimitations>',
            maxHrmpNumPerCandidate: 'u32',
            requiredParent: 'HeadData',
            validationCodeHash: 'ValidationCodeHash',
            upgradeRestriction: 'Option<UpgradeRestriction>',
            futureValidationCode: 'Option<(BlockNumber, ValidationCodeHash)>'
        },
        CoreAssignment: {
            core: 'CoreIndex',
            paraId: 'ParaId',
            kind: 'AssignmentKind',
            groupIdx: 'GroupIndex'
        },
        CoreIndex: 'u32',
        CoreOccupied: {
            _enum: {
                Parathread: 'ParathreadEntry',
                Parachain: 'Null'
            }
        },
        CoreState: {
            _enum: {
                Occupied: 'OccupiedCore',
                Scheduled: 'ScheduledCore',
                Free: 'Null'
            }
        },
        DisputeProof: {
            timeSlot: 'DisputesTimeSlot',
            kind: 'SlashingOffenceKind',
            validatorIndex: 'ValidatorIndex',
            validatorId: 'ValidatorId'
        },
        DisputesTimeSlot: {
            sessionIndex: 'SessionIndex',
            candidateHash: 'CandidateHash'
        },
        DoubleVoteReport: {
            identity: 'ValidatorId',
            first: '(Statement, ValidatorSignature)',
            second: '(Statement, ValidatorSignature)',
            proof: 'MembershipProof',
            signingContext: 'SigningContext'
        },
        DownwardMessage: 'Bytes',
        GroupIndex: 'u32',
        GroupRotationInfo: {
            sessionStartBlock: 'BlockNumber',
            groupRotationFrequency: 'BlockNumber',
            now: 'BlockNumber'
        },
        GlobalValidationSchedule: {
            maxCodeSize: 'u32',
            maxHeadDataSize: 'u32',
            blockNumber: 'BlockNumber'
        },
        HeadData: 'Bytes',
        HostConfiguration: {
            maxCodeSize: 'u32',
            maxHeadDataSize: 'u32',
            maxUpwardQueueCount: 'u32',
            maxUpwardQueueSize: 'u32',
            maxUpwardMessageSize: 'u32',
            maxUpwardMessageNumPerCandidate: 'u32',
            hrmpMaxMessageNumPerCandidate: 'u32',
            validationUpgradeFrequency: 'BlockNumber',
            validationUpgradeDelay: 'BlockNumber',
            maxPovSize: 'u32',
            maxDownwardMessageSize: 'u32',
            preferredDispatchableUpwardMessagesStepWeight: 'Weight',
            hrmpMaxParachainOutboundChannels: 'u32',
            hrmpMaxParathreadOutboundChannels: 'u32',
            hrmpOpenRequestTtl: 'u32',
            hrmpSenderDeposit: 'Balance',
            hrmpRecipientDeposit: 'Balance',
            hrmpChannelMaxCapacity: 'u32',
            hrmpChannelMaxTotalSize: 'u32',
            hrmpMaxParachainInboundChannels: 'u32',
            hrmpMaxParathreadInboundChannels: 'u32',
            hrmpChannelMaxMessageSize: 'u32',
            codeRetentionPeriod: 'BlockNumber',
            parathreadCores: 'u32',
            parathreadRetries: 'u32',
            groupRotationFrequency: 'BlockNumber',
            chainAvailabilityPeriod: 'BlockNumber',
            threadAvailabilityPeriod: 'BlockNumber',
            schedulingLookahead: 'u32',
            maxValidatorsPerCore: 'Option<u32>',
            maxValidators: 'Option<u32>',
            disputePeriod: 'SessionIndex',
            disputePostConclusionAcceptancePeriod: 'BlockNumber',
            disputeMaxSpamSlots: 'u32',
            disputeConclusionByTimeOutPeriod: 'BlockNumber',
            noShowSlots: 'u32',
            nDelayTranches: 'u32',
            zerothDelayTrancheWidth: 'u32',
            neededApprovals: 'u32',
            relayVrfModuloSamples: 'u32'
        },
        InboundDownwardMessage: {
            pubSentAt: 'BlockNumber',
            pubMsg: 'DownwardMessage'
        },
        InboundHrmpMessage: {
            sentAt: 'BlockNumber',
            data: 'Bytes'
        },
        InboundHrmpLimitations: {
            validWatermarks: 'Vec<BlockNumber>'
        },
        InboundHrmpMessages: 'Vec<InboundHrmpMessage>',
        LocalValidationData: {
            parentHead: 'HeadData',
            balance: 'Balance',
            codeUpgradeAllowed: 'Option<BlockNumber>'
        },
        MessageIngestionType: {
            downwardMessages: 'Vec<InboundDownwardMessage>',
            horizontalMessages: 'BTreeMap<ParaId, InboundHrmpMessages>'
        },
        MessageQueueChain: 'RelayChainHash',
        NodeFeatures: 'BitVec',
        OccupiedCore: {
            nextUpOnAvailable: 'Option<ScheduledCore>',
            occupiedSince: 'BlockNumber',
            timeOutAt: 'BlockNumber',
            nextUpOnTimeOut: 'Option<ScheduledCore>',
            availability: 'BitVec',
            groupResponsible: 'GroupIndex',
            candidateHash: 'CandidateHash',
            candidateDescriptor: 'CandidateDescriptor'
        },
        OccupiedCoreAssumption: {
            _enum: [
                'Included,',
                'TimedOut',
                'Free'
            ]
        },
        OutboundHrmpChannelLimitations: {
            bytesRemaining: 'u32',
            messagesRemaining: 'u32'
        },
        OutboundHrmpMessage: {
            recipient: 'u32',
            data: 'Bytes'
        },
        PendingSlashes: {
            _alias: {
                slashKeys: 'keys'
            },
            slashKeys: 'BTreeMap<ValidatorIndex, ValidatorId>',
            kind: 'SlashingOffenceKind'
        },
        ParachainDispatchOrigin: {
            _enum: [
                'Signed',
                'Parachain',
                'Root'
            ]
        },
        ParachainInherentData: {
            validationData: 'PersistedValidationData',
            relayChainState: 'StorageProof',
            downwardMessages: 'Vec<InboundDownwardMessage>',
            horizontalMessages: 'BTreeMap<ParaId, VecInboundHrmpMessage>'
        },
        ParachainsInherentData: {
            bitfields: 'SignedAvailabilityBitfields',
            backedCandidates: 'Vec<BackedCandidate>',
            disputes: 'MultiDisputeStatementSet',
            parentHeader: 'Header'
        },
        ParaGenesisArgs: {
            genesisHead: 'Bytes',
            validationCode: 'Bytes',
            parachain: 'bool'
        },
        ParaId: 'u32',
        ParaInfo: {
            manager: 'AccountId',
            deposit: 'Balance',
            locked: 'bool'
        },
        ParaLifecycle: {
            _enum: [
                'Onboarding',
                'Parathread',
                'Parachain',
                'UpgradingToParachain',
                'DowngradingToParathread',
                'OutgoingParathread',
                'OutgoingParachain'
            ]
        },
        ParaPastCodeMeta: {
            upgradeTimes: 'Vec<ReplacementTimes>',
            lastPruned: 'Option<BlockNumber>'
        },
        ParaScheduling: {
            _enum: [
                'Always',
                'Dynamic'
            ]
        },
        ParathreadClaim: '(ParaId, CollatorId)',
        ParathreadClaimQueue: {
            queue: 'Vec<QueuedParathread>',
            nextCoreOffset: 'u32'
        },
        ParathreadEntry: {
            claim: 'ParathreadClaim',
            retries: 'u32'
        },
        ParaValidatorIndex: 'u32',
        PersistedValidationData: {
            parentHead: 'HeadData',
            relayParentNumber: 'RelayChainBlockNumber',
            relayParentStorageRoot: 'Hash',
            maxPovSize: 'u32'
        },
        PvfCheckStatement: {
            accept: 'bool',
            subject: 'ValidationCodeHash',
            sessionIndex: 'SessionIndex',
            validatorIndex: 'ParaValidatorIndex'
        },
        QueuedParathread: {
            claim: 'ParathreadEntry',
            coreOffset: 'u32'
        },
        RelayBlockNumber: 'u32',
        RelayChainBlockNumber: 'RelayBlockNumber',
        RelayHash: 'Hash',
        RelayChainHash: 'RelayHash',
        Remark: '[u8; 32]',
        ReplacementTimes: {
            expectedAt: 'BlockNumber',
            activatedAt: 'BlockNumber'
        },
        Retriable: {
            _enum: {
                Never: 'Null',
                WithRetries: 'u32'
            }
        },
        ScheduledCore: {
            paraId: 'ParaId',
            collator: 'Option<CollatorId>'
        },
        Scheduling: {
            _enum: [
                'Always',
                'Dynamic'
            ]
        },
        ScrapedOnChainVotes: {
            session: 'SessionIndex',
            backingValidatorsPerCandidate: 'Vec<(CandidateReceipt, Vec<(ParaValidatorIndex, ValidityAttestation)>)>',
            disputes: 'MultiDisputeStatementSet'
        },
        SessionInfo: {
            activeValidatorIndices: 'Vec<ParaValidatorIndex>',
            randomSeed: '[u8; 32]',
            disputePeriod: 'SessionIndex',
            validators: 'Vec<ValidatorId>',
            discoveryKeys: 'Vec<AuthorityDiscoveryId>',
            assignmentKeys: 'Vec<AssignmentId>',
            validatorGroups: 'Vec<Vec<ValidatorIndex>>',
            nCores: 'u32',
            zerothDelayTrancheWidth: 'u32',
            relayVrfModuloSamples: 'u32',
            nDelayTranches: 'u32',
            noShowSlots: 'u32',
            neededApprovals: 'u32'
        },
        OldV1SessionInfo: {
            validators: 'Vec<ValidatorId>',
            discoveryKeys: 'Vec<AuthorityDiscoveryId>',
            assignmentKeys: 'Vec<AssignmentId>',
            validatorGroups: 'Vec<Vec<ParaValidatorIndex>>',
            nCores: 'u32',
            zerothDelayTrancheWidth: 'u32',
            relayVrfModuloSamples: 'u32',
            nDelayTranches: 'u32',
            noShowSlots: 'u32',
            neededApprovals: 'u32'
        },
        SessionInfoValidatorGroup: 'Vec<ParaValidatorIndex>',
        SignedAvailabilityBitfield: {
            payload: 'BitVec',
            validatorIndex: 'ParaValidatorIndex',
            signature: 'ValidatorSignature'
        },
        SignedAvailabilityBitfields: 'Vec<SignedAvailabilityBitfield>',
        SigningContext: {
            sessionIndex: 'SessionIndex',
            parentHash: 'Hash'
        },
        SlashingOffenceKind: {
            _enum: [
                'ForInvalid',
                'AgainstValid'
            ]
        },
        Statement: {
            _enum: {
                Never: 'Null',
                Candidate: 'Hash',
                Valid: 'Hash',
                Invalid: 'Hash'
            }
        },
        TransientValidationData: {
            maxCodeSize: 'u32',
            maxHeadDataSize: 'u32',
            balance: 'Balance',
            codeUpgradeAllowed: 'Option<BlockNumber>',
            dmqLength: 'u32'
        },
        UpgradeGoAhead: {
            _enum: [
                'Abort',
                'GoAhead'
            ]
        },
        UpgradeRestriction: {
            _enum: [
                'Present'
            ]
        },
        UpwardMessage: 'Bytes',
        ValidationFunctionParams: {
            maxCodeSize: 'u32',
            relayChainHeight: 'RelayChainBlockNumber',
            codeUpgradeAllowed: 'Option<RelayChainBlockNumber>'
        },
        ValidationCode: 'Bytes',
        ValidationCodeHash: 'Hash',
        ValidationData: {
            persisted: 'PersistedValidationData',
            transient: 'TransientValidationData'
        },
        ValidationDataType: {
            validationData: 'ValidationData',
            relayChainState: 'Vec<Bytes>'
        },
        ValidatorSignature: 'Signature',
        ValidityAttestation: {
            _enum: {
                Never: 'Null',
                Implicit: 'ValidatorSignature',
                Explicit: 'ValidatorSignature'
            }
        },
        MessagingStateSnapshot: {
            relayDispatchQueueSize: '(u32, u32)',
            egressChannels: 'Vec<MessagingStateSnapshotEgressEntry>'
        },
        MessagingStateSnapshotEgressEntry: '(ParaId, AbridgedHrmpChannel)',
        SystemInherentData: 'ParachainInherentData',
        VecInboundHrmpMessage: 'Vec<InboundHrmpMessage>'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/poll/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        Approvals: '[bool; 4]'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/purchase/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        AccountStatus: {
            validity: 'AccountValidity',
            freeBalance: 'Balance',
            lockedBalance: 'Balance',
            signature: 'Vec<u8>',
            vat: 'Permill'
        },
        AccountValidity: {
            _enum: [
                'Invalid',
                'Initiated',
                'Pending',
                'ValidLow',
                'ValidHigh',
                'Completed'
            ]
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/dryRunApi/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    DryRunApi: [
        {
            methods: {
                dry_run_call: {
                    description: 'Dry run call',
                    params: [
                        {
                            name: 'origin',
                            type: 'OriginCaller'
                        },
                        {
                            name: 'call',
                            type: 'RuntimeCall'
                        }
                    ],
                    type: 'Result<CallDryRunEffects, XcmDryRunApiError>'
                },
                dry_run_xcm: {
                    description: 'Dry run XCM program',
                    params: [
                        {
                            name: 'originLocation',
                            type: 'VersionedMultiLocation'
                        },
                        {
                            name: 'xcm',
                            type: 'VersionedXcm'
                        }
                    ],
                    type: 'Result<XcmDryRunEffects, XcmDryRunApiError>'
                }
            },
            version: 1
        },
        {
            methods: {
                dry_run_call: {
                    description: 'Dry run call',
                    params: [
                        {
                            name: 'origin',
                            type: 'OriginCaller'
                        },
                        {
                            name: 'call',
                            type: 'RuntimeCall'
                        },
                        {
                            name: 'resultXcmsVersion',
                            type: 'u32'
                        }
                    ],
                    type: 'Result<CallDryRunEffects, XcmDryRunApiError>'
                },
                dry_run_xcm: {
                    description: 'Dry run XCM program',
                    params: [
                        {
                            name: 'originLocation',
                            type: 'VersionedMultiLocation'
                        },
                        {
                            name: 'xcm',
                            type: 'VersionedXcm'
                        }
                    ],
                    type: 'Result<XcmDryRunEffects, XcmDryRunApiError>'
                }
            },
            version: 2
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/dryRunApi/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$dryRunApi$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/dryRunApi/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$dryRunApi$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        PostDispatchInfo: {
            actualWeight: 'Option<Weight>',
            paysFee: 'Pays'
        },
        DispatchResultWithPostInfo: 'Result<PostDispatchInfo, DispatchError>',
        CallDryRunEffects: {
            executionResult: 'DispatchResultWithPostInfo',
            emittedEvents: 'Vec<Event>',
            localXcm: 'Option<VersionedXcm>',
            forwardedXcms: 'Vec<(VersionedMultiLocation, Vec<VersionedXcm>)>'
        },
        XcmDryRunEffects: {
            executionResult: 'OutcomeV4',
            emittedEvents: 'Vec<Event>',
            forwardedXcms: 'Vec<(VersionedMultiLocation, Vec<VersionedXcm>)>'
        },
        XcmDryRunApiError: {
            _enum: [
                'Unimplemented',
                'VersionedConversionFailed'
            ]
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/v0.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v0",
    ()=>v0
]);
const v0 = {
    FungibilityV0: 'FungibilityV1',
    WildFungibilityV0: 'WildFungibilityV1',
    AssetInstanceV0: {
        _enum: {
            Undefined: 'Null',
            Index8: 'u8',
            Index16: 'Compact<u16>',
            Index32: 'Compact<u32>',
            Index64: 'Compact<u64>',
            Index128: 'Compact<u128>',
            Array4: '[u8; 4]',
            Array8: '[u8; 8]',
            Array16: '[u8; 16]',
            Array32: '[u8; 32]',
            Blob: 'Vec<u8>'
        }
    },
    JunctionV0: {
        _enum: {
            Parent: 'Null',
            Parachain: 'Compact<u32>',
            AccountId32: {
                network: 'NetworkId',
                id: 'AccountId'
            },
            AccountIndex64: {
                network: 'NetworkId',
                index: 'Compact<u64>'
            },
            AccountKey20: {
                network: 'NetworkId',
                key: '[u8; 20]'
            },
            PalletInstance: 'u8',
            GeneralIndex: 'Compact<u128>',
            GeneralKey: 'Vec<u8>',
            OnlyChild: 'Null',
            Plurality: {
                id: 'BodyId',
                part: 'BodyPart'
            }
        }
    },
    MultiAssetV0: {
        _enum: {
            None: 'Null',
            All: 'Null',
            AllFungible: 'Null',
            AllNonFungible: 'Null',
            AllAbstractFungible: 'Vec<u8>',
            AllAbstractNonFungible: 'Vec<u8>',
            AllConcreteFungible: 'MultiLocationV0',
            AllConcreteNonFungible: 'MultiLocationV0',
            AbstractFungible: {
                id: 'Vec<u8>',
                instance: 'Compact<u128>'
            },
            AbstractNonFungible: {
                class: 'Vec<u8>',
                instance: 'AssetInstanceV0'
            },
            ConcreteFungible: {
                id: 'MultiLocationV0',
                amount: 'Compact<u128>'
            },
            ConcreteNonFungible: {
                class: 'MultiLocationV0',
                instance: 'AssetInstanceV0'
            }
        }
    },
    MultiLocationV0: {
        _enum: {
            Here: 'Null',
            X1: 'JunctionV0',
            X2: '(JunctionV0, JunctionV0)',
            X3: '(JunctionV0, JunctionV0, JunctionV0)',
            X4: '(JunctionV0, JunctionV0, JunctionV0, JunctionV0)',
            X5: '(JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0)',
            X6: '(JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0)',
            X7: '(JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0)',
            X8: '(JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0, JunctionV0)'
        }
    },
    OriginKindV0: {
        _enum: [
            'Native',
            'SovereignAccount',
            'Superuser',
            'Xcm'
        ]
    },
    ResponseV0: {
        _enum: {
            Assets: 'Vec<MultiAssetV0>'
        }
    },
    XcmV0: {
        _enum: {
            WithdrawAsset: {
                assets: 'Vec<MultiAssetV0>',
                effects: 'Vec<XcmOrderV0>'
            },
            ReserveAssetDeposit: {
                assets: 'Vec<MultiAssetV0>',
                effects: 'Vec<XcmOrderV0>'
            },
            ReceiveTeleportedAsset: {
                assets: 'Vec<MultiAssetV0>',
                effects: 'Vec<XcmOrderV0>'
            },
            QueryResponse: {
                queryId: 'Compact<u64>',
                response: 'ResponseV0'
            },
            TransferAsset: {
                assets: 'Vec<MultiAssetV0>',
                dest: 'MultiLocationV0'
            },
            TransferReserveAsset: {
                assets: 'Vec<MultiAssetV0>',
                dest: 'MultiLocationV0',
                effects: 'Vec<XcmOrderV0>'
            },
            Transact: {
                originType: 'XcmOriginKind',
                requireWeightAtMost: 'u64',
                call: 'DoubleEncodedCall'
            },
            HrmpNewChannelOpenRequest: {
                sender: 'Compact<u32>',
                maxMessageSize: 'Compact<u32>',
                maxCapacity: 'Compact<u32>'
            },
            HrmpChannelAccepted: {
                recipient: 'Compact<u32>'
            },
            HrmpChannelClosing: {
                initiator: 'Compact<u32>',
                sender: 'Compact<u32>',
                recipient: 'Compact<u32>'
            },
            RelayedFrom: {
                who: 'MultiLocationV0',
                message: 'XcmV0'
            }
        }
    },
    XcmErrorV0: {
        _enum: {
            Undefined: 'Null',
            Overflow: 'Null',
            Unimplemented: 'Null',
            UnhandledXcmVersion: 'Null',
            UnhandledXcmMessage: 'Null',
            UnhandledEffect: 'Null',
            EscalationOfPrivilege: 'Null',
            UntrustedReserveLocation: 'Null',
            UntrustedTeleportLocation: 'Null',
            DestinationBufferOverflow: 'Null',
            SendFailed: 'Null',
            CannotReachDestination: '(MultiLocation, Xcm)',
            MultiLocationFull: 'Null',
            FailedToDecode: 'Null',
            BadOrigin: 'Null',
            ExceedsMaxMessageSize: 'Null',
            FailedToTransactAsset: 'Null',
            WeightLimitReached: 'Weight',
            Wildcard: 'Null',
            TooMuchWeightRequired: 'Null',
            NotHoldingFees: 'Null',
            WeightNotComputable: 'Null',
            Barrier: 'Null',
            NotWithdrawable: 'Null',
            LocationCannotHold: 'Null',
            TooExpensive: 'Null',
            AssetNotFound: 'Null',
            RecursionLimitReached: 'Null'
        }
    },
    XcmOrderV0: {
        _enum: {
            Null: 'Null',
            DepositAsset: {
                assets: 'Vec<MultiAssetV0>',
                dest: 'MultiLocationV0'
            },
            DepositReserveAsset: {
                assets: 'Vec<MultiAssetV0>',
                dest: 'MultiLocationV0',
                effects: 'Vec<XcmOrderV0>'
            },
            ExchangeAsset: {
                give: 'Vec<MultiAssetV0>',
                receive: 'Vec<MultiAssetV0>'
            },
            InitiateReserveWithdraw: {
                assets: 'Vec<MultiAssetV0>',
                reserve: 'MultiLocationV0',
                effects: 'Vec<XcmOrderV0>'
            },
            InitiateTeleport: {
                assets: 'Vec<MultiAssetV0>',
                dest: 'MultiLocationV0',
                effects: 'Vec<XcmOrderV0>'
            },
            QueryHolding: {
                queryId: 'Compact<u64>',
                dest: 'MultiLocationV0',
                assets: 'Vec<MultiAssetV0>'
            },
            BuyExecution: {
                fees: 'MultiAssetV0',
                weight: 'u64',
                debt: 'u64',
                haltOnError: 'bool',
                xcm: 'Vec<XcmV0>'
            }
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/v1.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v1",
    ()=>v1
]);
const v1 = {
    AssetInstanceV1: {
        _enum: {
            Undefined: 'Null',
            Index: 'Compact<u128>',
            Array4: '[u8; 4]',
            Array8: '[u8; 8]',
            Array16: '[u8; 16]',
            Array32: '[u8; 32]',
            Blob: 'Bytes'
        }
    },
    FungibilityV1: {
        _enum: {
            Fungible: 'Compact<u128>',
            NonFungible: 'AssetInstanceV1'
        }
    },
    JunctionV1: {
        _enum: {
            Parachain: 'Compact<u32>',
            AccountId32: {
                network: 'NetworkId',
                id: 'AccountId'
            },
            AccountIndex64: {
                network: 'NetworkId',
                index: 'Compact<u64>'
            },
            AccountKey20: {
                network: 'NetworkId',
                key: '[u8; 20]'
            },
            PalletInstance: 'u8',
            GeneralIndex: 'Compact<u128>',
            GeneralKey: 'Vec<u8>',
            OnlyChild: 'Null',
            Plurality: {
                id: 'BodyId',
                part: 'BodyPart'
            }
        }
    },
    JunctionsV1: {
        _enum: {
            Here: 'Null',
            X1: 'JunctionV1',
            X2: '(JunctionV1, JunctionV1)',
            X3: '(JunctionV1, JunctionV1, JunctionV1)',
            X4: '(JunctionV1, JunctionV1, JunctionV1, JunctionV1)',
            X5: '(JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1)',
            X6: '(JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1)',
            X7: '(JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1)',
            X8: '(JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1, JunctionV1)'
        }
    },
    MultiAssetsV1: 'Vec<MultiAssetV1>',
    MultiAssetV1: {
        id: 'XcmAssetId',
        fungibility: 'FungibilityV1'
    },
    MultiAssetFilterV1: {
        _enum: {
            Definite: 'MultiAssetsV1',
            Wild: 'WildMultiAssetV1'
        }
    },
    MultiLocationV1: {
        parents: 'u8',
        interior: 'JunctionsV1'
    },
    OriginKindV1: 'OriginKindV0',
    ResponseV1: {
        _enum: {
            Assets: 'MultiAssetsV1'
        }
    },
    WildFungibilityV1: {
        _enum: [
            'Fungible',
            'NonFungible'
        ]
    },
    WildMultiAssetV1: {
        _enum: {
            All: 'Null',
            AllOf: {
                id: 'XcmAssetId',
                fungibility: 'WildFungibilityV1'
            }
        }
    },
    XcmV1: {
        _enum: {
            WithdrawAsset: {
                assets: 'MultiAssetsV1',
                effects: 'Vec<XcmOrderV1>'
            },
            ReserveAssetDeposit: {
                assets: 'MultiAssetsV1',
                effects: 'Vec<XcmOrderV1>'
            },
            ReceiveTeleportedAsset: {
                assets: 'MultiAssetsV1',
                effects: 'Vec<XcmOrderV1>'
            },
            QueryResponse: {
                queryId: 'Compact<u64>',
                response: 'ResponseV1'
            },
            TransferAsset: {
                assets: 'MultiAssetsV1',
                dest: 'MultiLocationV1'
            },
            TransferReserveAsset: {
                assets: 'MultiAssetsV1',
                dest: 'MultiLocationV1',
                effects: 'Vec<XcmOrderV1>'
            },
            Transact: {
                originType: 'XcmOriginKind',
                requireWeightAtMost: 'u64',
                call: 'DoubleEncodedCall'
            },
            HrmpNewChannelOpenRequest: {
                sender: 'Compact<u32>',
                maxMessageSize: 'Compact<u32>',
                maxCapacity: 'Compact<u32>'
            },
            HrmpChannelAccepted: {
                recipient: 'Compact<u32>'
            },
            HrmpChannelClosing: {
                initiator: 'Compact<u32>',
                sender: 'Compact<u32>',
                recipient: 'Compact<u32>'
            },
            RelayedFrom: {
                who: 'MultiLocationV1',
                message: 'XcmV1'
            }
        }
    },
    XcmErrorV1: {
        _enum: {
            Undefined: 'Null',
            Overflow: 'Null',
            Unimplemented: 'Null',
            UnhandledXcmVersion: 'Null',
            UnhandledXcmMessage: 'Null',
            UnhandledEffect: 'Null',
            EscalationOfPrivilege: 'Null',
            UntrustedReserveLocation: 'Null',
            UntrustedTeleportLocation: 'Null',
            DestinationBufferOverflow: 'Null',
            SendFailed: 'Null',
            CannotReachDestination: '(MultiLocationV1, XcmV1)',
            MultiLocationFull: 'Null',
            FailedToDecode: 'Null',
            BadOrigin: 'Null',
            ExceedsMaxMessageSize: 'Null',
            FailedToTransactAsset: 'Null',
            WeightLimitReached: 'Weight',
            Wildcard: 'Null',
            TooMuchWeightRequired: 'Null',
            NotHoldingFees: 'Null',
            WeightNotComputable: 'Null',
            Barrier: 'Null',
            NotWithdrawable: 'Null',
            LocationCannotHold: 'Null',
            TooExpensive: 'Null',
            AssetNotFound: 'Null',
            DestinationUnsupported: 'Null',
            RecursionLimitReached: 'Null'
        }
    },
    XcmOrderV1: {
        _enum: {
            Noop: 'Null',
            DepositAsset: {
                assets: 'MultiAssetFilterV1',
                maxAssets: 'u32',
                beneficiary: 'MultiLocationV1'
            },
            DepositReserveAsset: {
                assets: 'MultiAssetFilterV1',
                maxAssets: 'u32',
                dest: 'MultiLocationV1',
                effects: 'Vec<XcmOrderV1>'
            },
            ExchangeAsset: {
                give: 'MultiAssetFilterV1',
                receive: 'MultiAssetsV1'
            },
            InitiateReserveWithdraw: {
                assets: 'MultiAssetFilterV1',
                reserve: 'MultiLocationV1',
                effects: 'Vec<XcmOrderV1>'
            },
            InitiateTeleport: {
                assets: 'MultiAssetFilterV1',
                dest: 'MultiLocationV1',
                effects: 'Vec<XcmOrderV1>'
            },
            QueryHolding: {
                queryId: 'Compact<u64>',
                dest: 'MultiLocationV1',
                assets: 'MultiAssetFilterV1'
            },
            BuyExecution: {
                fees: 'MultiAssetV1',
                weight: 'u64',
                debt: 'u64',
                haltOnError: 'bool',
                instructions: 'Vec<XcmV1>'
            }
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/v2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v2",
    ()=>v2
]);
const v2 = {
    AssetIdV2: {
        _enum: {
            Concrete: 'MultiLocationV2',
            Abstract: 'Bytes'
        }
    },
    AssetInstanceV2: {
        _enum: {
            Undefined: 'Null',
            Index: 'Compact<u128>',
            Array4: '[u8;4]',
            Array8: '[u8;8]',
            Array16: '[u8;16]',
            Array32: '[u8;32]',
            Blob: 'Bytes'
        }
    },
    BodyIdV2: {
        _enum: {
            Unit: 'Null',
            Named: 'Bytes',
            Index: 'Compact<u32>',
            Executive: 'Null',
            Technical: 'Null',
            Legislative: 'Null',
            Judicial: 'Null',
            Defense: 'Null',
            Administration: 'Null',
            Treasury: 'Null'
        }
    },
    BodyPartV2: {
        _enum: {
            Voice: 'Null',
            Members: {
                count: 'Compact<u32>'
            },
            Fraction: {
                nom: 'Compact<u32>',
                denom: 'Compact<u32>'
            },
            AtLeastProportion: {
                nom: 'Compact<u32>',
                denom: 'Compact<u32>'
            },
            MoreThanProportion: {
                nom: 'Compact<u32>',
                denom: 'Compact<u32>'
            }
        }
    },
    NetworkIdV2: {
        _enum: {
            Any: 'Null',
            Named: 'Bytes',
            Polkadot: 'Null',
            Kusama: 'Null'
        }
    },
    JunctionV2: {
        _enum: {
            Parachain: 'Compact<u32>',
            AccountId32: {
                network: 'NetworkIdV2',
                id: '[u8; 32]'
            },
            AccountIndex64: {
                network: 'NetworkIdV2',
                index: 'Compact<u64>'
            },
            AccountKey20: {
                network: 'NetworkIdV2',
                key: '[u8; 20]'
            },
            PalletInstance: 'u8',
            GeneralIndex: 'Compact<u128>',
            GeneralKey: 'Bytes',
            OnlyChild: 'Null',
            Plurality: {
                id: 'BodyIdV2',
                part: 'BodyPartV2'
            }
        }
    },
    JunctionsV2: {
        _enum: {
            Here: 'Null',
            X1: 'JunctionV2',
            X2: '(JunctionV2, JunctionV2)',
            X3: '(JunctionV2, JunctionV2, JunctionV2)',
            X4: '(JunctionV2, JunctionV2, JunctionV2, JunctionV2)',
            X5: '(JunctionV2, JunctionV2, JunctionV2, JunctionV2, JunctionV2)',
            X6: '(JunctionV2, JunctionV2, JunctionV2, JunctionV2, JunctionV2, JunctionV2)',
            X7: '(JunctionV2, JunctionV2, JunctionV2, JunctionV2, JunctionV2, JunctionV2, JunctionV2)',
            X8: '(JunctionV2, JunctionV2, JunctionV2, JunctionV2, JunctionV2, JunctionV2, JunctionV2, JunctionV2)'
        }
    },
    FungibilityV2: {
        _enum: {
            Fungible: 'Compact<u128>',
            NonFungible: 'AssetInstanceV2'
        }
    },
    InteriorMultiLocationV2: 'JunctionsV2',
    MultiAssetV2: {
        id: 'AssetIdV2',
        fun: 'FungibilityV2'
    },
    MultiAssetsV2: 'Vec<MultiAssetV2>',
    MultiAssetFilterV2: {
        _enum: {
            Definite: 'MultiAssetsV2',
            Wild: 'WildMultiAssetV2'
        }
    },
    MultiLocationV2: {
        parents: 'u8',
        interior: 'JunctionsV2'
    },
    OriginKindV2: {
        _enum: {
            Native: 'Null',
            SovereignAccount: 'Null',
            Superuser: 'Null',
            Xcm: 'Null'
        }
    },
    WildFungibilityV2: {
        _enum: {
            Fungible: 'Null',
            NonFungible: 'Null'
        }
    },
    ResponseV2: {
        _enum: {
            Null: 'Null',
            Assets: 'MultiAssetsV2',
            ExecutionResult: 'Option<(u32, XcmErrorV2)>',
            Version: 'u32'
        }
    },
    ResponseV2Error: '(u32, XcmErrorV2)',
    WeightLimitV2: {
        _enum: {
            Unlimited: 'Null',
            Limited: 'Compact<u64>'
        }
    },
    InstructionV2: {
        _enum: {
            WithdrawAsset: 'MultiAssetsV2',
            ReserveAssetDeposited: 'MultiAssetsV2',
            ReceiveTeleportedAsset: 'MultiAssetsV2',
            QueryResponse: {
                queryId: 'Compact<u64>',
                response: 'ResponseV2',
                maxWeight: 'Compact<u64>'
            },
            TransferAsset: {
                assets: 'MultiAssetsV2',
                beneficiary: 'MultiLocationV2'
            },
            TransferReserveAsset: {
                assets: 'MultiAssetsV2',
                dest: 'MultiLocationV2',
                xcm: 'XcmV2'
            },
            Transact: {
                originType: 'XcmOriginKind',
                requireWeightAtMost: 'Compact<u64>',
                call: 'DoubleEncodedCall'
            },
            HrmpNewChannelOpenRequest: {
                sender: 'Compact<u32>',
                maxMessageSize: 'Compact<u32>',
                maxCapacity: 'Compact<u32>'
            },
            HrmpChannelAccepted: {
                recipient: 'Compact<u32>'
            },
            HrmpChannelClosing: {
                initiator: 'Compact<u32>',
                sender: 'Compact<u32>',
                recipient: 'Compact<u32>'
            },
            ClearOrigin: 'Null',
            DescendOrigin: 'InteriorMultiLocationV2',
            ReportError: {
                queryId: 'Compact<u64>',
                dest: 'MultiLocationV2',
                maxResponseWeight: 'Compact<u64>'
            },
            DepositAsset: {
                assets: 'MultiAssetFilterV2',
                maxAssets: 'Compact<u32>',
                beneficiary: 'MultiLocationV2'
            },
            DepositReserveAsset: {
                assets: 'MultiAssetFilterV2',
                maxAssets: 'Compact<u32>',
                dest: 'MultiLocationV2',
                xcm: 'XcmV2'
            },
            ExchangeAsset: {
                give: 'MultiAssetFilterV2',
                receive: 'MultiAssetsV2'
            },
            InitiateReserveWithdraw: {
                assets: 'MultiAssetFilterV2',
                reserve: 'MultiLocationV2',
                xcm: 'XcmV2'
            },
            InitiateTeleport: {
                assets: 'MultiAssetFilterV2',
                dest: 'MultiLocationV2',
                xcm: 'XcmV2'
            },
            QueryHolding: {
                queryId: 'Compact<u64>',
                dest: 'MultiLocationV2',
                assets: 'MultiAssetFilterV2',
                maxResponseWeight: 'Compact<u64>'
            },
            BuyExecution: {
                fees: 'MultiAssetV2',
                weightLimit: 'WeightLimitV2'
            },
            RefundSurplus: 'Null',
            SetErrorHandler: 'XcmV2<RuntimeCall>',
            SetAppendix: 'XcmV2<RuntimeCall>',
            ClearError: 'Null',
            ClaimAsset: {
                assets: 'MultiAssetsV2',
                ticket: 'MultiLocationV2'
            },
            Trap: 'Compact<u64>',
            SubscribeVersion: {
                queryId: 'Compact<u64>',
                maxResponseWeight: 'Compact<u64>'
            },
            UnsubscribeVersion: 'Null'
        }
    },
    WildMultiAssetV2: {
        _enum: {
            All: 'Null',
            AllOf: {
                id: 'AssetIdV2',
                fun: 'WildFungibilityV2'
            }
        }
    },
    XcmV2: 'Vec<InstructionV2>',
    XcmErrorV2: {
        _enum: {
            Overflow: 'Null',
            Unimplemented: 'Null',
            UntrustedReserveLocation: 'Null',
            UntrustedTeleportLocation: 'Null',
            MultiLocationFull: 'Null',
            MultiLocationNotInvertible: 'Null',
            BadOrigin: 'Null',
            InvalidLocation: 'Null',
            AssetNotFound: 'Null',
            FailedToTransactAsset: 'Null',
            NotWithdrawable: 'Null',
            LocationCannotHold: 'Null',
            ExceedsMaxMessageSize: 'Null',
            DestinationUnsupported: 'Null',
            Transport: 'Null',
            Unroutable: 'Null',
            UnknownClaim: 'Null',
            FailedToDecode: 'Null',
            MaxWeightInvalid: 'Null',
            NotHoldingFees: 'Null',
            TooExpensive: 'Null',
            Trap: 'u64',
            UnhandledXcmVersion: 'Null',
            WeightLimitReached: 'Weight',
            Barrier: 'Null',
            WeightNotComputable: 'Null'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/v3.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v3",
    ()=>v3
]);
const v3 = {
    AssetIdV3: {
        _enum: {
            Concrete: 'MultiLocationV3',
            Abstract: 'Bytes'
        }
    },
    BodyIdV3: {
        _enum: {
            Unit: 'Null',
            Moniker: '[u8;4]',
            Index: 'Compact<u32>',
            Executive: 'Null',
            Technical: 'Null',
            Legislative: 'Null',
            Judicial: 'Null',
            Defense: 'Null',
            Administration: 'Null',
            Treasury: 'Null'
        }
    },
    BodyPartV3: {
        _enum: {
            Voice: 'Null',
            Members: {
                count: 'Compact<u32>'
            },
            Fraction: {
                nom: 'Compact<u32>',
                denom: 'Compact<u32>'
            },
            AtLeastProportion: {
                nom: 'Compact<u32>',
                denom: 'Compact<u32>'
            },
            MoreThanProportion: {
                nom: 'Compact<u32>',
                denom: 'Compact<u32>'
            }
        }
    },
    AssetInstanceV3: {
        _enum: {
            Undefined: 'Null',
            Index: 'Compact<u128>',
            Array4: '[u8;4]',
            Array8: '[u8;8]',
            Array16: '[u8;16]',
            Array32: '[u8;32]'
        }
    },
    FungibilityV3: {
        _enum: {
            Fungible: 'Compact<u128>',
            NonFungible: 'AssetInstanceV3'
        }
    },
    InteriorMultiLocationV3: 'JunctionsV3',
    JunctionV3: {
        _enum: {
            Parachain: 'Compact<u32>',
            AccountId32: {
                network: 'Option<NetworkIdV3>',
                id: '[u8;32]'
            },
            AccountIndex64: {
                network: 'Option<NetworkIdV3>',
                index: 'Compact<u64>'
            },
            AccountKey20: {
                network: 'Option<NetworkIdV3>',
                key: '[u8;20]'
            },
            PalletInstance: 'u8',
            GeneralIndex: 'Compact<u128>',
            GeneralKey: {
                length: 'u8',
                data: '[u8;32]'
            },
            OnlyChild: 'Null',
            Plurality: {
                id: 'BodyIdV3',
                part: 'BodyPartV3'
            },
            GlobalConsensus: 'NetworkIdV3'
        }
    },
    JunctionsV3: {
        _enum: {
            Here: 'Null',
            X1: 'JunctionV3',
            X2: '(JunctionV3, JunctionV3)',
            X3: '(JunctionV3, JunctionV3, JunctionV3)',
            X4: '(JunctionV3, JunctionV3, JunctionV3, JunctionV3)',
            X5: '(JunctionV3, JunctionV3, JunctionV3, JunctionV3, JunctionV3)',
            X6: '(JunctionV3, JunctionV3, JunctionV3, JunctionV3, JunctionV3, JunctionV3)',
            X7: '(JunctionV3, JunctionV3, JunctionV3, JunctionV3, JunctionV3, JunctionV3, JunctionV3)',
            X8: '(JunctionV3, JunctionV3, JunctionV3, JunctionV3, JunctionV3, JunctionV3, JunctionV3, JunctionV3)'
        }
    },
    MaybeErrorCodeV3: {
        _enum: {
            Success: 'Null',
            Error: 'Bytes',
            TruncatedError: 'Bytes'
        }
    },
    MaxPalletsInfo: 'u32',
    MultiAssetV3: {
        id: 'AssetIdV3',
        fun: 'FungibilityV3'
    },
    MultiAssetsV3: 'Vec<MultiAssetV3>',
    MultiAssetFilterV3: {
        _enum: {
            Definite: 'MultiAssetsV3',
            Wild: 'WildMultiAssetV3'
        }
    },
    MultiLocationV3: {
        parents: 'u8',
        interior: 'JunctionsV3'
    },
    MaxPalletNameLen: 'u32',
    NetworkIdV3: {
        _enum: {
            ByGenesis: '[u8;32]',
            ByFork: {
                blockNumber: 'u64',
                blockHash: '[u8;32]'
            },
            Polkadot: 'Null',
            Kusama: 'Null',
            Westend: 'Null',
            Rococo: 'Null',
            Wococo: 'Null',
            Ethereum: {
                chainId: 'Compact<u64>'
            },
            BitcoinCore: 'Null',
            BitcoinCash: 'Null',
            PolkadotBulletin: 'Null'
        }
    },
    OriginKindV3: 'OriginKindV2',
    PalletInfoV3: {
        index: 'Compact<u32>',
        name: 'Bytes',
        moduleName: 'Bytes',
        major: 'Compact<u32>',
        minor: 'Compact<u32>',
        patch: 'Compact<u32>'
    },
    WildFungibilityV3: 'WildFungibilityV2',
    QueryResponseInfoV3: {
        destination: 'MultiLocationV3',
        queryId: 'Compact<u64>',
        maxWeight: 'WeightV2'
    },
    ResponseV3: {
        _enum: {
            Null: 'Null',
            Assets: 'MultiAssetsV3',
            ExecutionResult: 'Option<(u32,XcmErrorV3)>',
            Version: 'u32',
            PalletsInfo: 'Vec<PalletInfoV3>',
            DispatchResult: 'MaybeErrorCodeV3'
        }
    },
    XcmErrorV3: {
        _enum: {
            Overflow: 'Null',
            Unimplemented: 'Null',
            UntrustedReserveLocation: 'Null',
            UntrustedTeleportLocation: 'Null',
            LocationFull: 'Null',
            LocationNotInvertible: 'Null',
            BadOrigin: 'Null',
            InvalidLocation: 'Null',
            AssetNotFound: 'Null',
            FailedToTransactAsset: 'Null',
            NotWithdrawable: 'Null',
            LocationCannotHold: 'Null',
            ExceedsMaxMessageSize: 'Null',
            DestinationUnsupported: 'Null',
            Transport: 'Null',
            Unroutable: 'Null',
            UnknownClaim: 'Null',
            FailedToDecode: 'Null',
            MaxWeightInvalid: 'Null',
            NotHoldingFees: 'Null',
            TooExpensive: 'Null',
            Trap: 'u64',
            ExpectationFalse: 'Null',
            PalletNotFound: 'Null',
            NameMismatch: 'Null',
            VersionIncompatible: 'Null',
            HoldingWouldOverflow: 'Null',
            ExportError: 'Null',
            ReanchorFailed: 'Null',
            NoDeal: 'Null',
            FeesNotMet: 'Null',
            LockError: 'Null',
            NoPermission: 'Null',
            Unanchored: 'Null',
            NotDepositable: 'Null',
            UnhandledXcmVersion: 'Null',
            WeightLimitReached: 'WeightV2',
            Barrier: 'Null',
            ExceedsStackLimit: 'Null'
        }
    },
    ResponseV3Error: '(u32, XcmErrorV3)',
    ResponseV3Result: 'Option<(u32, ResponseV3Error)>',
    WeightLimitV3: {
        _enum: {
            Unlimited: 'Null',
            Limited: 'WeightV2'
        }
    },
    InstructionV3: {
        _enum: {
            WithdrawAsset: 'MultiAssetsV3',
            ReserveAssetDeposited: 'MultiAssetsV3',
            ReceiveTeleportedAsset: 'MultiAssetsV3',
            QueryResponse: {
                queryId: 'Compact<u64>',
                response: 'ResponseV3',
                maxWeight: 'WeightV2',
                querier: 'Option<MultiLocationV3>'
            },
            TransferAsset: {
                assets: 'MultiAssetsV3',
                beneficiary: 'MultiLocationV3'
            },
            TransferReserveAsset: {
                assets: 'MultiAssetsV3',
                dest: 'MultiLocationV3',
                xcm: 'XcmV3'
            },
            Transact: {
                originKind: 'XcmOriginKind',
                requireWeightAtMost: 'WeightV2',
                call: 'DoubleEncodedCall'
            },
            HrmpNewChannelOpenRequest: {
                sender: 'Compact<u32>',
                maxMessageSize: 'Compact<u32>',
                maxCapacity: 'Compact<u32>'
            },
            HrmpChannelAccepted: {
                recipient: 'Compact<u32>'
            },
            HrmpChannelClosing: {
                initiator: 'Compact<u32>',
                sender: 'Compact<u32>',
                recipient: 'Compact<u32>'
            },
            ClearOrigin: 'Null',
            DescendOrigin: 'JunctionsV3',
            ReportError: 'QueryResponseInfoV3',
            DepositAsset: {
                assets: 'MultiAssetFilterV3',
                beneficiary: 'MultiLocationV3'
            },
            DepositReserveAsset: {
                assets: 'MultiAssetFilterV3',
                dest: 'MultiLocationV3',
                xcm: 'XcmV3'
            },
            ExchangeAsset: {
                give: 'MultiAssetFilterV3',
                want: 'MultiAssetsV3',
                maximal: 'bool'
            },
            InitiateReserveWithdraw: {
                assets: 'MultiAssetFilterV3',
                reserve: 'MultiLocationV3',
                xcm: 'XcmV3'
            },
            InitiateTeleport: {
                assets: 'MultiAssetFilterV3',
                dest: 'MultiLocationV3',
                xcm: 'XcmV3'
            },
            ReportHolding: {
                responseInfo: 'QueryResponseInfoV3',
                assets: 'MultiAssetFilterV3'
            },
            BuyExecution: {
                fees: 'MultiAssetV3',
                weightLimit: 'WeightLimitV3'
            },
            RefundSurplus: 'Null',
            SetErrorHandler: 'XcmV3<RuntimeCall>',
            SetAppendix: 'XcmV3<RuntimeCall>',
            ClearError: 'Null',
            ClaimAsset: {
                assets: 'MultiAssetsV3',
                ticket: 'MultiLocationV3'
            },
            Trap: 'Compact<u64>',
            SubscribeVersion: {
                queryId: 'Compact<u64>',
                maxResponseWeight: 'WeightV2'
            },
            UnsubscribeVersion: 'Null',
            BurnAsset: 'MultiAssetsV3',
            ExpectAsset: 'MultiAssetsV3',
            ExpectOrigin: 'Option<MultiLocationV3>',
            ExpectError: 'Option<(u32, XcmErrorV3)>',
            ExpectTransactStatus: 'MaybeErrorCodeV3',
            QueryPallet: {
                moduleName: 'Vec<u8>',
                responseInfo: 'QueryResponseInfoV3'
            },
            ExpectPallet: {
                index: 'Compact<u32>',
                name: 'Vec<u8>',
                moduleName: 'Vec<u8>',
                crateMajor: 'Compact<u32>',
                minCrateMinor: 'Compact<u32>'
            },
            ReportTransactStatus: 'QueryResponseInfoV3',
            ClearTransactStatus: 'Null',
            UniversalOrigin: 'JunctionV3',
            ExportMessage: {
                network: 'NetworkIdV3',
                destination: 'JunctionsV3',
                xcm: 'XcmV3'
            },
            LockAsset: {
                asset: 'MultiAssetV3',
                unlocker: 'MultiLocationV3'
            },
            UnlockAsset: {
                asset: 'MultiAssetV3',
                target: 'MultiLocationV3'
            },
            NoteUnlockable: {
                asset: 'MultiAssetV3',
                owner: 'MultiLocationV3'
            },
            RequestUnlock: {
                asset: 'MultiAssetV3',
                locker: 'MultiLocationV3'
            },
            SetFeesMode: {
                jitWithdraw: 'bool'
            },
            SetTopic: '[u8; 32]',
            ClearTopic: 'Null',
            AliasOrigin: 'MultiLocationV3',
            UnpaidExecution: {
                weightLimit: 'WeightLimitV3',
                checkOrigin: 'Option<MultiLocationV3>'
            }
        }
    },
    WildMultiAssetV3: {
        _enum: {
            All: 'Null',
            AllOf: {
                id: 'AssetIdV3',
                fun: 'WildFungibilityV2'
            },
            AllCounted: 'Compact<u32>',
            AllOfCounted: {
                id: 'AssetIdV3',
                fun: 'WildFungibilityV2',
                count: 'Compact<u32>'
            }
        }
    },
    VersionV3: 'u32',
    XcmV3: 'Vec<InstructionV3>'
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/v4.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v4",
    ()=>v4
]);
const v4 = {
    AssetIdV4: 'MultiLocationV4',
    AssetInstanceV4: {
        _enum: {
            Undefined: 'Null',
            Index: 'Compact<u128>',
            Array4: '[u8;4]',
            Array8: '[u8;8]',
            Array16: '[u8;16]',
            Array32: '[u8;32]'
        }
    },
    FungibilityV4: {
        _enum: {
            Fungible: 'Compact<u128>',
            NonFungible: 'AssetInstanceV4'
        }
    },
    UncheckedFungibilityV4: {
        _enum: {
            Fungible: 'Compact<u128>',
            NonFungible: 'AssetInstanceV4'
        }
    },
    JunctionV4: {
        _enum: {
            Parachain: 'Compact<u32>',
            AccountId32: {
                network: 'Option<NetworkIdV4>',
                id: '[u8;32]'
            },
            AccountIndex64: {
                network: 'Option<NetworkIdV4>',
                index: 'Compact<u64>'
            },
            AccountKey20: {
                network: 'Option<NetworkIdV4>',
                key: '[u8;20]'
            },
            PalletInstance: 'u8',
            GeneralIndex: 'Compact<u128>',
            GeneralKey: {
                length: 'u8',
                data: '[u8;32]'
            },
            OnlyChild: 'Null',
            Plurality: {
                id: 'BodyIdV3',
                part: 'BodyPartV3'
            },
            GlobalConsensus: 'NetworkIdV4'
        }
    },
    JunctionsV4: {
        _enum: {
            Here: 'Null',
            X1: '[JunctionV4;1]',
            X2: '[JunctionV4;2]',
            X3: '[JunctionV4;3]',
            X4: '[JunctionV4;4]',
            X5: '[JunctionV4;5]',
            X6: '[JunctionV4;6]',
            X7: '[JunctionV4;7]',
            X8: '[JunctionV4;8]'
        }
    },
    MaxPalletsInfo: 'u32',
    NetworkIdV4: 'NetworkIdV3',
    MultiAssetV4: {
        id: 'AssetIdV4',
        fun: 'FungibilityV4'
    },
    MultiAssetsV4: 'Vec<MultiAssetV4>',
    MultiAssetFilterV4: {
        _enum: {
            Definite: 'MultiAssetsV4',
            Wild: 'WildMultiAssetV4'
        }
    },
    MultiLocationV4: {
        parents: 'u8',
        interior: 'JunctionsV4'
    },
    OriginKindV4: 'XcmOriginKind',
    PalletInfoV4: 'PalletInfoV3',
    WildFungibilityV4: 'WildFungibilityV2',
    QueryResponseInfoV4: {
        destination: 'MultiLocationV4',
        queryId: 'Compact<u64>',
        maxWeight: 'WeightV2'
    },
    ResponseV4: {
        _enum: {
            Null: 'Null',
            Assets: 'MultiAssetsV4',
            ExecutionResult: 'Option<(u32, XcmErrorV3)>',
            Version: 'u32',
            PalletsInfo: 'Vec<PalletInfoV4>',
            DispatchResult: 'MaybeErrorCodeV3'
        }
    },
    InstructionV4: {
        _enum: {
            WithdrawAsset: 'MultiAssetsV4',
            ReserveAssetDeposited: 'MultiAssetsV4',
            ReceiveTeleportedAsset: 'MultiAssetsV4',
            QueryResponse: {
                queryId: 'Compact<u64>',
                response: 'ResponseV4',
                maxWeight: 'WeightV2',
                querier: 'Option<MultiLocationV4>'
            },
            TransferAsset: {
                assets: 'MultiAssetsV4',
                beneficiary: 'MultiLocationV4'
            },
            TransferReserveAsset: {
                assets: 'MultiAssetsV4',
                dest: 'MultiLocationV4',
                xcm: 'XcmV4'
            },
            Transact: {
                originKind: 'OriginKindV4',
                requireWeightAtMost: 'WeightV2',
                call: 'DoubleEncodedCall'
            },
            HrmpNewChannelOpenRequest: {
                sender: 'Compact<u32>',
                maxMessageSize: 'Compact<u32>',
                maxCapacity: 'Compact<u32>'
            },
            HrmpChannelAccepted: {
                recipient: 'Compact<u32>'
            },
            HrmpChannelClosing: {
                initiator: 'Compact<u32>',
                sender: 'Compact<u32>',
                recipient: 'Compact<u32>'
            },
            ClearOrigin: 'Null',
            DescendOrigin: 'JunctionsV4',
            ReportError: 'QueryResponseInfoV4',
            DepositAsset: {
                assets: 'MultiAssetFilterV4',
                beneficiary: 'MultiLocationV4'
            },
            DepositReserveAsset: {
                assets: 'MultiAssetFilterV4',
                dest: 'MultiLocationV4',
                xcm: 'XcmV4'
            },
            ExchangeAsset: {
                give: 'MultiAssetFilterV4',
                want: 'MultiAssetsV4',
                maximal: 'bool'
            },
            InitiateReserveWithdraw: {
                assets: 'MultiAssetFilterV4',
                reserve: 'MultiLocationV4',
                xcm: 'XcmV4'
            },
            InitiateTeleport: {
                assets: 'MultiAssetFilterV4',
                dest: 'MultiLocationV4',
                xcm: 'XcmV4'
            },
            ReportHolding: {
                responseInfo: 'QueryResponseInfoV4',
                assets: 'MultiAssetFilterV4'
            },
            BuyExecution: {
                fees: 'MultiAssetV4',
                weightLimit: 'WeightLimitV3'
            },
            RefundSurplus: 'Null',
            SetErrorHandler: 'XcmV4',
            SetAppendix: 'XcmV4',
            ClearError: 'Null',
            ClaimAsset: {
                assets: 'MultiAssetsV4',
                ticket: 'MultiLocationV4'
            },
            Trap: 'Compact<u64>',
            SubscribeVersion: {
                queryId: 'Compact<u64>',
                maxResponseWeight: 'WeightV2'
            },
            UnsubscribeVersion: 'Null',
            BurnAsset: 'MultiAssetsV4',
            ExpectAsset: 'MultiAssetsV4',
            ExpectOrigin: 'Option<MultiLocationV4>',
            ExpectError: 'Option<(u32, XcmErrorV3)>',
            ExpectTransactStatus: 'MaybeErrorCodeV3',
            QueryPallet: {
                moduleName: 'Vec<u8>',
                responseInfo: 'QueryResponseInfoV4'
            },
            ExpectPallet: {
                index: 'Compact<u32>',
                name: 'Vec<u8>',
                moduleName: 'Vec<u8>',
                crateMajor: 'Compact<u32>',
                minCrateMinor: 'Compact<u32>'
            },
            ReportTransactStatus: 'QueryResponseInfoV4',
            ClearTransactStatus: 'Null',
            UniversalOrigin: 'JunctionV4',
            ExportMessage: {
                network: 'NetworkIdV4',
                destination: 'JunctionsV4',
                xcm: 'XcmV4'
            },
            LockAsset: {
                asset: 'MultiAssetV4',
                unlocker: 'MultiLocationV4'
            },
            UnlockAsset: {
                asset: 'MultiAssetV4',
                target: 'MultiLocationV4'
            },
            NoteUnlockable: {
                asset: 'MultiAssetV4',
                owner: 'MultiLocationV4'
            },
            RequestUnlock: {
                asset: 'MultiAssetV4',
                locker: 'MultiLocationV4'
            },
            SetFeesMode: {
                jitWithdraw: 'bool'
            },
            SetTopic: '[u8;32]',
            ClearTopic: 'Null',
            AliasOrigin: 'MultiLocationV4',
            UnpaidExecution: {
                weightLimit: 'WeightLimitV3',
                checkOrigin: 'Option<MultiLocationV4>'
            }
        }
    },
    OutcomeV4: {
        _enum: {
            Complete: {
                used: 'WeightV2'
            },
            Incomplete: {
                used: 'WeightV2',
                error: 'XcmErrorV3'
            },
            Error: {
                error: 'XcmErrorV3'
            }
        }
    },
    WildMultiAssetV4: {
        _enum: {
            All: 'Null',
            AllOf: {
                id: 'AssetIdV4',
                fun: 'WildFungibilityV4'
            },
            AllCounted: 'Compact<u32>',
            AllOfCounted: {
                id: 'AssetIdV4',
                fun: 'WildFungibilityV4',
                count: 'Compact<u32>'
            }
        }
    },
    VersionV4: 'u32',
    XcmV4: 'Vec<InstructionV4>',
    XcmErrorV4: 'XcmErrorV3'
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/v5.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v5",
    ()=>v5
]);
const v5 = {
    AssetIdV5: 'MultiLocationV5',
    AssetInstanceV5: {
        _enum: {
            Undefined: 'Null',
            Index: 'Compact<u128>',
            Array4: '[u8;4]',
            Array8: '[u8;8]',
            Array16: '[u8;16]',
            Array32: '[u8;32]'
        }
    },
    // Maps to xcmV5::Asset but we keep the prefix 'Multi'
    // to keep consistency with the rest of the code base.
    MultiAssetV5: {
        id: 'AssetIdV5',
        fun: 'FungibilityV5'
    },
    MultiAssetsV5: 'Vec<MultiAssetV5>',
    WildMultiAssetV5: {
        _enum: {
            All: 'Null',
            AllOf: {
                id: 'AssetIdV5',
                fun: 'WildFungibilityV5'
            },
            AllCounted: 'Compact<u32>',
            AllOfCounted: {
                id: 'AssetIdV5',
                fun: 'WildFungibilityV5',
                count: 'Compact<u32>'
            }
        }
    },
    MultiAssetFilterV5: {
        _enum: {
            Definite: 'MultiAssetsV5',
            Wild: 'WildMultiAssetV5'
        }
    },
    MultiAssetTransferFilterV5: {
        _enum: {
            Teleport: 'MultiAssetFilterV5',
            ReserveDeposit: 'MultiAssetFilterV5',
            ReserveWithdraw: 'MultiAssetFilterV5'
        }
    },
    FungibilityV5: {
        _enum: {
            Fungible: 'Compact<u128>',
            NonFungible: 'AssetInstanceV5'
        }
    },
    UncheckedFungibilityV5: {
        _enum: {
            Fungible: 'Compact<u128>',
            NonFungible: 'AssetInstanceV5'
        }
    },
    WildFungibilityV5: 'WildFungibilityV2',
    JunctionV5: {
        _enum: {
            Parachain: 'Compact<u32>',
            AccountId32: {
                network: 'Option<NetworkIdV5>',
                id: '[u8;32]'
            },
            AccountIndex64: {
                network: 'Option<NetworkIdV5>',
                index: 'Compact<u64>'
            },
            AccountKey20: {
                network: 'Option<NetworkIdV5>',
                key: '[u8;20]'
            },
            PalletInstance: 'u8',
            GeneralIndex: 'Compact<u128>',
            GeneralKey: {
                length: 'u8',
                data: '[u8;32]'
            },
            OnlyChild: 'Null',
            Plurality: {
                id: 'BodyIdV3',
                part: 'BodyPartV3'
            },
            GlobalConsensus: 'NetworkIdV5'
        }
    },
    NetworkIdV5: {
        _enum: {
            ByGenesis: '[u8;32]',
            ByFork: {
                blockNumber: 'u64',
                blockHash: '[u8;32]'
            },
            Polkadot: 'Null',
            Kusama: 'Null',
            Ethereum: {
                chainId: 'Compact<u64>'
            },
            BitcoinCore: 'Null',
            BitcoinCash: 'Null',
            PolkadotBulletin: 'Null'
        }
    },
    JunctionsV5: {
        _enum: {
            Here: 'Null',
            X1: '[JunctionV5;1]',
            X2: '[JunctionV5;2]',
            X3: '[JunctionV5;3]',
            X4: '[JunctionV5;4]',
            X5: '[JunctionV5;5]',
            X6: '[JunctionV5;6]',
            X7: '[JunctionV5;7]',
            X8: '[JunctionV5;8]'
        }
    },
    MultiLocationV5: {
        parents: 'u8',
        interior: 'JunctionsV5'
    },
    InteriorMultiLocationV5: 'JunctionsV5',
    XcmV5: 'Vec<InstructionV5>',
    PalletInfoV5: 'PalletInfoV3',
    ResponseV5: {
        _enum: {
            Null: 'Null',
            Assets: 'MultiAssetsV5',
            ExecutionResult: 'Option<(u32, XcmErrorV3)>',
            Version: 'u32',
            PalletsInfo: 'Vec<PalletInfoV5>',
            DispatchResult: 'MaybeErrorCodeV3'
        }
    },
    QueryResponseInfoV5: {
        destination: 'MultiLocationV5',
        queryId: 'Compact<u64>',
        maxWeight: 'WeightV2'
    },
    InstructionV5: {
        _enum: {
            WithdrawAsset: 'MultiAssetsV5',
            ReserveAssetDeposited: 'MultiAssetsV5',
            ReceiveTeleportedAsset: 'MultiAssetsV5',
            QueryResponse: {
                queryId: 'Compact<u64>',
                response: 'ResponseV5',
                maxWeight: 'WeightV2',
                querier: 'Option<MultiLocationV5>'
            },
            TransferAsset: {
                assets: 'MultiAssetsV5',
                beneficiary: 'MultiLocationV5'
            },
            TransferReserveAsset: {
                assets: 'MultiAssetsV5',
                dest: 'MultiLocationV5',
                xcm: 'XcmV5'
            },
            Transact: {
                originKind: 'OriginKindV4',
                requireWeightAtMost: 'WeightV2',
                call: 'DoubleEncodedCall'
            },
            HrmpNewChannelOpenRequest: {
                sender: 'Compact<u32>',
                maxMessageSize: 'Compact<u32>',
                maxCapacity: 'Compact<u32>'
            },
            HrmpChannelAccepted: {
                recipient: 'Compact<u32>'
            },
            HrmpChannelClosing: {
                initiator: 'Compact<u32>',
                sender: 'Compact<u32>',
                recipient: 'Compact<u32>'
            },
            ClearOrigin: 'Null',
            DescendOrigin: 'InteriorMultiLocationV5',
            ReportError: 'QueryResponseInfoV4',
            DepositAsset: {
                assets: 'MultiAssetFilterV5',
                beneficiary: 'MultiLocationV5'
            },
            DepositReserveAsset: {
                assets: 'MultiAssetFilterV5',
                dest: 'MultiLocationV5',
                xcm: 'XcmV5'
            },
            ExchangeAsset: {
                give: 'MultiAssetFilterV5',
                want: 'MultiAssetsV5',
                maximal: 'bool'
            },
            InitiateReserveWithdraw: {
                assets: 'MultiAssetFilterV5',
                reserve: 'MultiLocationV5',
                xcm: 'XcmV5'
            },
            InitiateTeleport: {
                assets: 'MultiAssetFilterV5',
                dest: 'MultiLocationV5',
                xcm: 'XcmV5'
            },
            ReportHolding: {
                responseInfo: 'QueryResponseInfoV4',
                assets: 'MultiAssetFilterV5'
            },
            BuyExecution: {
                fees: 'MultiAssetV4',
                weightLimit: 'WeightLimitV3'
            },
            RefundSurplus: 'Null',
            SetErrorHandler: 'XcmV5',
            SetAppendix: 'XcmV5',
            ClearError: 'Null',
            ClaimAsset: {
                assets: 'MultiAssetsV5',
                ticket: 'MultiLocationV5'
            },
            Trap: 'Compact<u64>',
            SubscribeVersion: {
                queryId: 'Compact<u64>',
                maxResponseWeight: 'WeightV2'
            },
            UnsubscribeVersion: 'Null',
            BurnAsset: 'MultiAssetsV5',
            ExpectAsset: 'MultiAssetsV5',
            ExpectOrigin: 'Option<MultiLocationV5>',
            ExpectError: 'Option<(u32, XcmErrorV3)>',
            ExpectTransactStatus: 'MaybeErrorCodeV3',
            QueryPallet: {
                moduleName: 'Vec<u8>',
                responseInfo: 'QueryResponseInfoV4'
            },
            ExpectPallet: {
                index: 'Compact<u32>',
                name: 'Vec<u8>',
                moduleName: 'Vec<u8>',
                crateMajor: 'Compact<u32>',
                minCrateMinor: 'Compact<u32>'
            },
            ReportTransactStatus: 'QueryResponseInfoV4',
            ClearTransactStatus: 'Null',
            UniversalOrigin: 'JunctionV5',
            ExportMessage: {
                network: 'NetworkIdV5',
                destination: 'InteriorMultiLocationV5',
                xcm: 'XcmV5'
            },
            LockAsset: {
                asset: 'MultiAssetV5',
                unlocker: 'MultiLocationV5'
            },
            UnlockAsset: {
                asset: 'MultiAssetV5',
                target: 'MultiLocationV5'
            },
            NoteUnlockable: {
                asset: 'MultiAssetV5',
                owner: 'MultiLocationV5'
            },
            RequestUnlock: {
                asset: 'MultiAssetV5',
                locker: 'MultiLocationV5'
            },
            SetFeesMode: {
                jitWithdraw: 'bool'
            },
            SetTopic: '[u8;32]',
            ClearTopic: 'Null',
            AliasOrigin: 'MultiLocationV5',
            UnpaidExecution: {
                weightLimit: 'WeightLimitV3',
                checkOrigin: 'Option<MultiLocationV5>'
            },
            PayFees: {
                asset: 'MultiAssetV5'
            },
            InitiateTransfer: {
                destination: 'MultiLocationV5',
                remoteFees: 'Option<MultiAssetTransferFilterV5>',
                preserveOrigin: 'bool',
                assets: 'Vec<MultiAssetTransferFilterV5>',
                remoteXcm: 'XcmV5'
            },
            ExecuteWithOrigin: {
                descendant_origin: 'Option<InteriorMultiLocationV5>',
                xcm: 'XcmV5'
            },
            SetHints: {
                hints: 'Vec<HintV5>'
            }
        }
    },
    HintV5: {
        _enum: {
            AssetClaimer: {
                location: 'MultiLocationV5'
            }
        }
    },
    XcmErrorV5: 'XcmErrorV3'
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2d$create$2f$util$2f$xcm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types-create/util/xcm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$v0$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/v0.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$v1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/v1.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$v2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/v2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$v3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/v3.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/v4.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$v5$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/v5.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const XCM_LATEST = 'V5';
const xcm = {
    XcmOrigin: {
        _enum: {
            Xcm: 'MultiLocation'
        }
    },
    XcmpMessageFormat: {
        _enum: [
            'ConcatenatedVersionedXcm',
            'ConcatenatedEncodedBlob',
            'Signals'
        ]
    },
    XcmAssetId: {
        _enum: {
            Concrete: 'MultiLocation',
            Abstract: 'Bytes'
        }
    },
    InboundStatus: {
        _enum: [
            'Ok',
            'Suspended'
        ]
    },
    OutboundStatus: {
        _enum: [
            'Ok',
            'Suspended'
        ]
    },
    MultiAssets: 'Vec<MultiAsset>'
};
const location = {
    BodyId: {
        _enum: {
            Unit: 'Null',
            Named: 'Vec<u8>',
            Index: 'Compact<u32>',
            Executive: 'Null',
            Technical: 'Null',
            Legislative: 'Null',
            Judicial: 'Null'
        }
    },
    BodyPart: {
        _enum: {
            Voice: 'Null',
            Members: 'Compact<u32>',
            Fraction: {
                nom: 'Compact<u32>',
                denom: 'Compact<u32>'
            },
            AtLeastProportion: {
                nom: 'Compact<u32>',
                denom: 'Compact<u32>'
            },
            MoreThanProportion: {
                nom: 'Compact<u32>',
                denom: 'Compact<u32>'
            }
        }
    },
    InteriorMultiLocation: 'Junctions',
    NetworkId: {
        _enum: {
            Any: 'Null',
            Named: 'Vec<u8>',
            Polkadot: 'Null',
            Kusama: 'Null'
        }
    }
};
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        ...location,
        ...xcm,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$v0$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v0"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$v1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v1"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$v2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v2"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$v3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v3"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v4"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$v5$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v5"],
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2d$create$2f$util$2f$xcm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapXcmTypes"])(XCM_LATEST),
        DoubleEncodedCall: {
            encoded: 'Bytes'
        },
        XcmOriginKind: {
            _enum: [
                'Native',
                'SovereignAccount',
                'Superuser',
                'Xcm'
            ]
        },
        Outcome: {
            _enum: {
                Complete: 'Weight',
                Incomplete: '(Weight, XcmErrorV0)',
                Error: 'XcmErrorV0'
            }
        },
        QueryId: 'u64',
        QueryStatus: {
            _enum: {
                Pending: {
                    responder: 'VersionedMultiLocation',
                    maybeNotify: 'Option<(u8, u8)>',
                    timeout: 'BlockNumber'
                },
                Ready: {
                    response: 'VersionedResponse',
                    at: 'BlockNumber'
                }
            }
        },
        QueueConfigData: {
            suspendThreshold: 'u32',
            dropThreshold: 'u32',
            resumeThreshold: 'u32',
            thresholdWeight: 'Weight',
            weightRestrictDecay: 'Weight'
        },
        VersionMigrationStage: {
            _enum: {
                MigrateSupportedVersion: 'Null',
                MigrateVersionNotifiers: 'Null',
                NotifyCurrentTargets: 'Option<Bytes>',
                MigrateAndNotifyOldTargets: 'Null'
            }
        },
        VersionedMultiAsset: {
            _enum: {
                V0: 'MultiAssetV0',
                V1: 'MultiAssetV1',
                V2: 'MultiAssetV2',
                V3: 'MultiAssetV3',
                V4: 'MultiAssetV4',
                V5: 'MultiAssetV5'
            }
        },
        VersionedMultiAssets: {
            _enum: {
                V0: 'Vec<MultiAssetV0>',
                V1: 'MultiAssetsV1',
                V2: 'MultiAssetsV2',
                V3: 'MultiAssetsV3',
                V4: 'MultiAssetsV4',
                V5: 'MultiAssetsV5'
            }
        },
        VersionedMultiLocation: {
            _enum: {
                V0: 'MultiLocationV0',
                V1: 'MultiLocationV1',
                V2: 'MultiLocationV2',
                V3: 'MultiLocationV3',
                V4: 'MultiLocationV4',
                v5: 'MultiLocationV5'
            }
        },
        VersionedResponse: {
            V0: 'ResponseV0',
            V1: 'ResponseV1',
            V2: 'ResponseV2',
            V3: 'ResponseV3',
            V4: 'ResponseV4',
            V5: 'ResponseV5'
        },
        VersionedXcm: {
            _enum: {
                V0: 'XcmV0',
                V1: 'XcmV1',
                V2: 'XcmV2',
                V3: 'XcmV3',
                V4: 'XcmV4',
                V5: 'XcmV5'
            }
        },
        XcmVersion: 'u32'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcmPaymentApi/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    XcmPaymentApi: [
        {
            methods: {
                query_acceptable_payment_assets: {
                    description: 'The API to query acceptable payment assets',
                    params: [
                        {
                            name: 'version',
                            type: 'u32'
                        }
                    ],
                    type: 'Result<Vec<XcmVersionedAssetId>, XcmPaymentApiError>'
                },
                query_weight_to_asset_fee: {
                    description: '',
                    params: [
                        {
                            name: 'weight',
                            type: 'WeightV2'
                        },
                        {
                            name: 'asset',
                            type: 'XcmVersionedAssetId'
                        }
                    ],
                    type: 'Result<u128, XcmPaymentApiError>'
                },
                query_xcm_weight: {
                    description: '',
                    params: [
                        {
                            name: 'message',
                            type: 'XcmVersionedXcm'
                        }
                    ],
                    type: 'Result<WeightV2, XcmPaymentApiError>'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcmPaymentApi/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcmPaymentApi$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcmPaymentApi/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcmPaymentApi$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        XcmPaymentApiError: {
            _enum: [
                'Unimplemented',
                'VersionedConversionFailed',
                'WeightNotComputable',
                'UnhandledXcmVersion',
                'AssetNotFound'
            ]
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcmRuntimeApi/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    LocationToAccountApi: [
        {
            methods: {
                convert_location: {
                    description: 'Converts `Location` to `AccountId`',
                    params: [
                        {
                            name: 'location',
                            type: 'XcmVersionedLocation'
                        }
                    ],
                    type: 'Result<AccountId, Error>'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcmRuntimeApi/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcmRuntimeApi$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcmRuntimeApi/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcmRuntimeApi$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        Error: {
            _enum: [
                'Unsupported',
                'VersionedConversionFailed'
            ]
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/contractsAbi/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
/* eslint-disable sort-keys */ const layout = {
    ContractCryptoHasher: {
        _enum: [
            'Blake2x256',
            'Sha2x256',
            'Keccak256'
        ]
    },
    ContractDiscriminant: 'u32',
    ContractLayoutArray: {
        offset: 'ContractLayoutKey',
        len: 'u32',
        cellsPerElem: 'u64',
        layout: 'ContractStorageLayout'
    },
    ContractLayoutCell: {
        key: 'ContractLayoutKey',
        ty: 'SiLookupTypeId'
    },
    ContractLayoutEnum: {
        dispatchKey: 'ContractLayoutKey',
        variants: 'BTreeMap<ContractDiscriminant, ContractLayoutStruct>'
    },
    ContractLayoutHash: {
        offset: 'ContractLayoutKey',
        strategy: 'ContractLayoutHashingStrategy',
        layout: 'ContractStorageLayout'
    },
    ContractLayoutHashingStrategy: {
        hasher: 'ContractCryptoHasher',
        postfix: 'Vec<u8>',
        prefix: 'Vec<u8>'
    },
    ContractLayoutKey: '[u8; 32]',
    ContractLayoutStruct: {
        fields: 'Vec<ContractLayoutStructField>'
    },
    ContractLayoutStructField: {
        layout: 'ContractStorageLayout',
        name: 'Text'
    },
    ContractStorageLayout: {
        _enum: {
            Cell: 'ContractLayoutCell',
            Hash: 'ContractLayoutHash',
            Array: 'ContractLayoutArray',
            Struct: 'ContractLayoutStruct',
            Enum: 'ContractLayoutEnum'
        }
    }
};
const spec = {
    ContractConstructorSpecV0: {
        name: 'Text',
        selector: 'ContractSelector',
        args: 'Vec<ContractMessageParamSpecV0>',
        docs: 'Vec<Text>'
    },
    ContractConstructorSpecV1: {
        name: 'Vec<Text>',
        selector: 'ContractSelector',
        args: 'Vec<ContractMessageParamSpecV0>',
        docs: 'Vec<Text>'
    },
    ContractConstructorSpecV2: {
        label: 'Text',
        selector: 'ContractSelector',
        args: 'Vec<ContractMessageParamSpecV2>',
        docs: 'Vec<Text>'
    },
    ContractConstructorSpecV3: {
        label: 'Text',
        selector: 'ContractSelector',
        payable: 'bool',
        args: 'Vec<ContractMessageParamSpecV2>',
        docs: 'Vec<Text>'
    },
    ContractConstructorSpecV4: {
        label: 'Text',
        selector: 'ContractSelector',
        payable: 'bool',
        args: 'Vec<ContractMessageParamSpecV2>',
        docs: 'Vec<Text>',
        default: 'bool',
        returnType: 'Option<ContractTypeSpec>'
    },
    ContractContractSpecV0: {
        constructors: 'Vec<ContractConstructorSpecV0>',
        messages: 'Vec<ContractMessageSpecV0>',
        events: 'Vec<ContractEventSpecV0>',
        docs: 'Vec<Text>'
    },
    ContractContractSpecV1: {
        constructors: 'Vec<ContractConstructorSpecV1>',
        messages: 'Vec<ContractMessageSpecV1>',
        events: 'Vec<ContractEventSpecV1>',
        docs: 'Vec<Text>'
    },
    ContractContractSpecV2: {
        constructors: 'Vec<ContractConstructorSpecV2>',
        messages: 'Vec<ContractMessageSpecV2>',
        events: 'Vec<ContractEventSpecV2>',
        docs: 'Vec<Text>'
    },
    ContractContractSpecV3: {
        constructors: 'Vec<ContractConstructorSpecV3>',
        messages: 'Vec<ContractMessageSpecV2>',
        events: 'Vec<ContractEventSpecV2>',
        docs: 'Vec<Text>'
    },
    ContractContractSpecV4: {
        constructors: 'Vec<ContractConstructorSpecV4>',
        messages: 'Vec<ContractMessageSpecV3>',
        events: 'Vec<ContractEventSpecV2>',
        docs: 'Vec<Text>',
        environment: 'ContractEnvironmentV4'
    },
    ContractContractSpecV5: {
        constructors: 'Vec<ContractConstructorSpecV4>',
        messages: 'Vec<ContractMessageSpecV3>',
        events: 'Vec<ContractEventSpecV3>',
        docs: 'Vec<Text>',
        environment: 'ContractEnvironmentV4'
    },
    ContractContractSpecV6: {
        constructors: 'Vec<ContractConstructorSpecV4>',
        messages: 'Vec<ContractMessageSpecV3>',
        events: 'Vec<ContractEventSpecV3>',
        docs: 'Vec<Text>',
        environment: 'ContractEnvironmentV4'
    },
    ContractDisplayName: 'SiPath',
    ContractEventParamSpecV0: {
        name: 'Text',
        indexed: 'bool',
        type: 'ContractTypeSpec',
        docs: 'Vec<Text>'
    },
    ContractEventParamSpecV2: {
        label: 'Text',
        indexed: 'bool',
        type: 'ContractTypeSpec',
        docs: 'Vec<Text>'
    },
    ContractEventSpecV0: {
        name: 'Text',
        args: 'Vec<ContractEventParamSpecV0>',
        docs: 'Vec<Text>'
    },
    ContractEventSpecV1: {
        name: 'Text',
        args: 'Vec<ContractEventParamSpecV0>',
        docs: 'Vec<Text>'
    },
    ContractEventSpecV2: {
        label: 'Text',
        args: 'Vec<ContractEventParamSpecV2>',
        docs: 'Vec<Text>'
    },
    ContractEventSpecV3: {
        label: 'Text',
        args: 'Vec<ContractEventParamSpecV2>',
        docs: 'Vec<Text>',
        module_path: 'Text',
        signature_topic: 'Option<[u8; 32]>'
    },
    ContractMessageParamSpecV0: {
        name: 'Text',
        type: 'ContractTypeSpec'
    },
    ContractMessageParamSpecV2: {
        label: 'Text',
        type: 'ContractTypeSpec'
    },
    ContractMessageSpecV0: {
        name: 'Text',
        selector: 'ContractSelector',
        mutates: 'bool',
        payable: 'bool',
        args: 'Vec<ContractMessageParamSpecV0>',
        returnType: 'Option<ContractTypeSpec>',
        docs: 'Vec<Text>'
    },
    ContractMessageSpecV1: {
        name: 'Vec<Text>',
        selector: 'ContractSelector',
        mutates: 'bool',
        payable: 'bool',
        args: 'Vec<ContractMessageParamSpecV0>',
        returnType: 'Option<ContractTypeSpec>',
        docs: 'Vec<Text>'
    },
    ContractMessageSpecV2: {
        label: 'Text',
        selector: 'ContractSelector',
        mutates: 'bool',
        payable: 'bool',
        args: 'Vec<ContractMessageParamSpecV2>',
        returnType: 'Option<ContractTypeSpec>',
        docs: 'Vec<Text>'
    },
    ContractMessageSpecV3: {
        label: 'Text',
        selector: 'ContractSelector',
        mutates: 'bool',
        payable: 'bool',
        args: 'Vec<ContractMessageParamSpecV2>',
        returnType: 'Option<ContractTypeSpec>',
        docs: 'Vec<Text>',
        default: 'bool'
    },
    ContractSelector: '[u8; 4]',
    ContractTypeSpec: {
        type: 'SiLookupTypeId',
        displayName: 'ContractDisplayName'
    }
};
const latest = {
    ContractConstructorSpecLatest: 'ContractConstructorSpecV4',
    ContractEventSpecLatest: 'ContractEventSpecV3',
    ContractEventParamSpecLatest: 'ContractEventParamSpecV2',
    ContractMessageParamSpecLatest: 'ContractMessageParamSpecV2',
    ContractMessageSpecLatest: 'ContractMessageSpecV3',
    ContractMetadataLatest: 'ContractMetadataV6'
};
const __TURBOPACK__default__export__ = {
    rpc: {},
    types: {
        ...layout,
        ...spec,
        ...latest,
        ContractProjectInfo: {
            source: 'ContractProjectSource',
            contract: 'ContractProjectContract'
        },
        ContractReviveProjectInfo: {
            source: 'ContractReviveProjectSource',
            contract: 'ContractProjectContract'
        },
        ContractMetadataV0: {
            metadataVersion: 'Text',
            types: 'Vec<Si0Type>',
            spec: 'ContractContractSpecV0'
        },
        ContractMetadataV1: {
            types: 'Vec<PortableType>',
            spec: 'ContractContractSpecV1'
        },
        ContractMetadataV2: {
            types: 'Vec<PortableType>',
            spec: 'ContractContractSpecV2'
        },
        ContractMetadataV3: {
            types: 'Vec<PortableType>',
            spec: 'ContractContractSpecV3'
        },
        ContractMetadataV4: {
            types: 'Vec<PortableType>',
            spec: 'ContractContractSpecV4',
            version: 'Text'
        },
        ContractMetadataV5: {
            types: 'Vec<PortableType>',
            spec: 'ContractContractSpecV5',
            version: 'u64'
        },
        ContractMetadataV6: {
            types: 'Vec<PortableType>',
            spec: 'ContractContractSpecV6',
            version: 'u64'
        },
        ContractMetadata: {
            _enum: {
                V0: 'ContractMetadataV0',
                V1: 'ContractMetadataV1',
                V2: 'ContractMetadataV2',
                V3: 'ContractMetadataV3',
                V4: 'ContractMetadataV4',
                V5: 'ContractMetadataV5',
                V6: 'ContractMetadataV6'
            }
        },
        ContractProjectV0: {
            metadataVersion: 'Text',
            source: 'ContractProjectSource',
            contract: 'ContractProjectContract',
            types: 'Vec<Si0Type>',
            spec: 'ContractContractSpecV0'
        },
        ContractProject: '(ContractProjectInfo, ContractMetadata)',
        ContractProjectContract: {
            _alias: {
                docs: 'documentation'
            },
            name: 'Text',
            version: 'Text',
            authors: 'Vec<Text>',
            description: 'Option<Text>',
            docs: 'Option<Text>',
            repository: 'Option<Text>',
            homepage: 'Option<Text>',
            license: 'Option<Text>'
        },
        ContractProjectSource: {
            _alias: {
                wasmHash: 'hash'
            },
            wasmHash: '[u8; 32]',
            language: 'Text',
            compiler: 'Text',
            wasm: 'Raw'
        },
        ContractReviveProjectSource: {
            _alias: {
                wasmHash: 'hash',
                wasm: 'contract_binary'
            },
            wasmHash: '[u8; 32]',
            language: 'Text',
            compiler: 'Text',
            wasm: 'Raw'
        },
        ContractEnvironmentV4: {
            _alias: {
                hashType: 'hash'
            },
            // NOTE These are not marked optional in the Rust code, however since we
            // convert from older versions to newer, we may not have these fields.
            // The Option<...> works since our inputs are always JSON, so it will
            // be None when not specified.
            //
            // Additionally we don't mark the full structure as Option, rather we
            // do it on a per-field basis since fields may be added as the versions
            // progress.
            accountId: 'Option<ContractTypeSpec>',
            balance: 'Option<ContractTypeSpec>',
            blockNumber: 'Option<ContractTypeSpec>',
            hashType: 'Option<ContractTypeSpec>',
            timestamp: 'Option<ContractTypeSpec>',
            maxEventTopics: 'Option<u32>'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/eth/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const netRpc = {
    listening: {
        aliasSection: 'net',
        description: 'Returns true if client is actively listening for network connections. Otherwise false.',
        params: [],
        type: 'bool'
    },
    peerCount: {
        aliasSection: 'net',
        description: 'Returns number of peers connected to node.',
        params: [],
        type: 'Text'
    },
    version: {
        aliasSection: 'net',
        description: 'Returns protocol version.',
        params: [],
        type: 'Text'
    }
};
const web3Rpc = {
    clientVersion: {
        aliasSection: 'web3',
        description: 'Returns current client version.',
        params: [],
        type: 'Text'
    },
    sha3: {
        aliasSection: 'web3',
        description: 'Returns sha3 of the given data',
        params: [
            {
                name: 'data',
                type: 'Bytes'
            }
        ],
        type: 'H256'
    }
};
const rpc = {
    ...netRpc,
    ...web3Rpc,
    accounts: {
        description: 'Returns accounts list.',
        params: [],
        type: 'Vec<H160>'
    },
    blockNumber: {
        description: 'Returns the blockNumber',
        params: [],
        type: 'U256'
    },
    call: {
        description: 'Call contract, returning the output data.',
        params: [
            {
                name: 'request',
                type: 'EthCallRequest'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'number',
                type: 'BlockNumber'
            }
        ],
        type: 'Bytes'
    },
    chainId: {
        description: 'Returns the chain ID used for transaction signing at the current best block. None is returned if not available.',
        params: [],
        type: 'U64'
    },
    coinbase: {
        description: 'Returns block author.',
        params: [],
        type: 'H160'
    },
    estimateGas: {
        description: 'Estimate gas needed for execution of given contract.',
        params: [
            {
                name: 'request',
                type: 'EthCallRequest'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'number',
                type: 'BlockNumber'
            }
        ],
        type: 'U256'
    },
    feeHistory: {
        description: 'Returns fee history for given block count & reward percentiles',
        params: [
            {
                name: 'blockCount',
                type: 'U256'
            },
            {
                name: 'newestBlock',
                type: 'BlockNumber'
            },
            {
                name: 'rewardPercentiles',
                type: 'Option<Vec<f64>>'
            }
        ],
        type: 'EthFeeHistory'
    },
    gasPrice: {
        description: 'Returns current gas price.',
        params: [],
        type: 'U256'
    },
    getBalance: {
        description: 'Returns balance of the given account.',
        params: [
            {
                name: 'address',
                type: 'H160'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'number',
                type: 'BlockNumber'
            }
        ],
        type: 'U256'
    },
    getBlockByHash: {
        description: 'Returns block with given hash.',
        params: [
            {
                name: 'hash',
                type: 'H256'
            },
            {
                name: 'full',
                type: 'bool'
            }
        ],
        type: 'Option<EthRichBlock>'
    },
    getBlockByNumber: {
        description: 'Returns block with given number.',
        params: [
            {
                name: 'block',
                type: 'BlockNumber'
            },
            {
                name: 'full',
                type: 'bool'
            }
        ],
        type: 'Option<EthRichBlock>'
    },
    getBlockTransactionCountByHash: {
        description: 'Returns the number of transactions in a block with given hash.',
        params: [
            {
                name: 'hash',
                type: 'H256'
            }
        ],
        type: 'U256'
    },
    getBlockTransactionCountByNumber: {
        description: 'Returns the number of transactions in a block with given block number.',
        params: [
            {
                name: 'block',
                type: 'BlockNumber'
            }
        ],
        type: 'U256'
    },
    getCode: {
        description: 'Returns the code at given address at given time (block number).',
        params: [
            {
                name: 'address',
                type: 'H160'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'number',
                type: 'BlockNumber'
            }
        ],
        type: 'Bytes'
    },
    getFilterChanges: {
        description: 'Returns filter changes since last poll.',
        params: [
            {
                name: 'index',
                type: 'U256'
            }
        ],
        type: 'EthFilterChanges'
    },
    getFilterLogs: {
        description: 'Returns all logs matching given filter (in a range \'from\' - \'to\').',
        params: [
            {
                name: 'index',
                type: 'U256'
            }
        ],
        type: 'Vec<EthLog>'
    },
    getLogs: {
        description: 'Returns logs matching given filter object.',
        params: [
            {
                name: 'filter',
                type: 'EthFilter'
            }
        ],
        type: 'Vec<EthLog>'
    },
    getProof: {
        description: 'Returns proof for account and storage.',
        params: [
            {
                name: 'address',
                type: 'H160'
            },
            {
                name: 'storageKeys',
                type: 'Vec<H256>'
            },
            {
                name: 'number',
                type: 'BlockNumber'
            }
        ],
        type: 'EthAccount'
    },
    getStorageAt: {
        description: 'Returns content of the storage at given address.',
        params: [
            {
                name: 'address',
                type: 'H160'
            },
            {
                name: 'index',
                type: 'U256'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'number',
                type: 'BlockNumber'
            }
        ],
        type: 'H256'
    },
    getTransactionByBlockHashAndIndex: {
        description: 'Returns transaction at given block hash and index.',
        params: [
            {
                name: 'hash',
                type: 'H256'
            },
            {
                name: 'index',
                type: 'U256'
            }
        ],
        type: 'EthTransaction'
    },
    getTransactionByBlockNumberAndIndex: {
        description: 'Returns transaction by given block number and index.',
        params: [
            {
                name: 'number',
                type: 'BlockNumber'
            },
            {
                name: 'index',
                type: 'U256'
            }
        ],
        type: 'EthTransaction'
    },
    getTransactionByHash: {
        description: 'Get transaction by its hash.',
        params: [
            {
                name: 'hash',
                type: 'H256'
            }
        ],
        type: 'EthTransaction'
    },
    getTransactionCount: {
        description: 'Returns the number of transactions sent from given address at given time (block number).',
        params: [
            {
                name: 'address',
                type: 'H160'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'number',
                type: 'BlockNumber'
            }
        ],
        type: 'U256'
    },
    getTransactionReceipt: {
        description: 'Returns transaction receipt by transaction hash.',
        params: [
            {
                name: 'hash',
                type: 'H256'
            }
        ],
        type: 'EthReceipt'
    },
    getUncleByBlockHashAndIndex: {
        description: 'Returns an uncles at given block and index.',
        params: [
            {
                name: 'hash',
                type: 'H256'
            },
            {
                name: 'index',
                type: 'U256'
            }
        ],
        type: 'EthRichBlock'
    },
    getUncleByBlockNumberAndIndex: {
        description: 'Returns an uncles at given block and index.',
        params: [
            {
                name: 'number',
                type: 'BlockNumber'
            },
            {
                name: 'index',
                type: 'U256'
            }
        ],
        type: 'EthRichBlock'
    },
    getUncleCountByBlockHash: {
        description: 'Returns the number of uncles in a block with given hash.',
        params: [
            {
                name: 'hash',
                type: 'H256'
            }
        ],
        type: 'U256'
    },
    getUncleCountByBlockNumber: {
        description: 'Returns the number of uncles in a block with given block number.',
        params: [
            {
                name: 'number',
                type: 'BlockNumber'
            }
        ],
        type: 'U256'
    },
    getWork: {
        description: 'Returns the hash of the current block, the seedHash, and the boundary condition to be met.',
        params: [],
        type: 'EthWork'
    },
    hashrate: {
        description: 'Returns the number of hashes per second that the node is mining with.',
        params: [],
        type: 'U256'
    },
    maxPriorityFeePerGas: {
        description: 'Returns max priority fee per gas',
        params: [],
        type: 'U256'
    },
    mining: {
        description: 'Returns true if client is actively mining new blocks.',
        params: [],
        type: 'bool'
    },
    newBlockFilter: {
        description: 'Returns id of new block filter.',
        params: [],
        type: 'U256'
    },
    newFilter: {
        description: 'Returns id of new filter.',
        params: [
            {
                name: 'filter',
                type: 'EthFilter'
            }
        ],
        type: 'U256'
    },
    newPendingTransactionFilter: {
        description: 'Returns id of new block filter.',
        params: [],
        type: 'U256'
    },
    protocolVersion: {
        description: 'Returns protocol version encoded as a string (quotes are necessary).',
        params: [],
        type: 'u64'
    },
    sendRawTransaction: {
        description: 'Sends signed transaction, returning its hash.',
        params: [
            {
                name: 'bytes',
                type: 'Bytes'
            }
        ],
        type: 'H256'
    },
    sendTransaction: {
        description: 'Sends transaction; will block waiting for signer to return the transaction hash',
        params: [
            {
                name: 'tx',
                type: 'EthTransactionRequest'
            }
        ],
        type: 'H256'
    },
    submitHashrate: {
        description: 'Used for submitting mining hashrate.',
        params: [
            {
                name: 'index',
                type: 'U256'
            },
            {
                name: 'hash',
                type: 'H256'
            }
        ],
        type: 'bool'
    },
    submitWork: {
        description: 'Used for submitting a proof-of-work solution.',
        params: [
            {
                name: 'nonce',
                type: 'H64'
            },
            {
                name: 'headerHash',
                type: 'H256'
            },
            {
                name: 'mixDigest',
                type: 'H256'
            }
        ],
        type: 'bool'
    },
    subscribe: {
        description: 'Subscribe to Eth subscription.',
        params: [
            {
                name: 'kind',
                type: 'EthSubKind'
            },
            {
                isOptional: true,
                name: 'params',
                type: 'EthSubParams'
            }
        ],
        pubsub: [
            'subscription',
            'subscribe',
            'unsubscribe'
        ],
        type: 'Null'
    },
    syncing: {
        description: 'Returns an object with data about the sync status or false.',
        params: [],
        type: 'EthSyncStatus'
    },
    uninstallFilter: {
        description: 'Uninstalls filter.',
        params: [
            {
                name: 'index',
                type: 'U256'
            }
        ],
        type: 'bool'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/eth/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const ethMethodsV4 = {
    account_basic: {
        description: 'Returns pallet_evm::Accounts by address.',
        params: [
            {
                name: 'address',
                type: 'H160'
            }
        ],
        type: 'EvmAccount'
    },
    account_code_at: {
        description: 'For a given account address, returns pallet_evm::AccountCodes.',
        params: [
            {
                name: 'address',
                type: 'H160'
            }
        ],
        type: 'Bytes'
    },
    author: {
        description: 'Returns the converted FindAuthor::find_author authority id.',
        params: [],
        type: 'H160'
    },
    call: {
        description: 'Returns a frame_ethereum::call response. If `estimate` is true,',
        params: [
            {
                name: 'from',
                type: 'H160'
            },
            {
                name: 'to',
                type: 'H160'
            },
            {
                name: 'data',
                type: 'Vec<u8>'
            },
            {
                name: 'value',
                type: 'U256'
            },
            {
                name: 'gasLimit',
                type: 'U256'
            },
            {
                name: 'maxFeePerGas',
                type: 'Option<U256>'
            },
            {
                name: 'maxPriorityFeePerGas',
                type: 'Option<U256>'
            },
            {
                name: 'nonce',
                type: 'Option<U256>'
            },
            {
                name: 'estimate',
                type: 'bool'
            },
            {
                name: 'accessList',
                type: 'Option<Vec<(H160, Vec<H256>)>>'
            }
        ],
        type: 'Result<EvmCallInfo, DispatchError>'
    },
    chain_id: {
        description: 'Returns runtime defined pallet_evm::ChainId.',
        params: [],
        type: 'u64'
    },
    create: {
        description: 'Returns a frame_ethereum::call response. If `estimate` is true,',
        params: [
            {
                name: 'from',
                type: 'H160'
            },
            {
                name: 'data',
                type: 'Vec<u8>'
            },
            {
                name: 'value',
                type: 'U256'
            },
            {
                name: 'gasLimit',
                type: 'U256'
            },
            {
                name: 'maxFeePerGas',
                type: 'Option<U256>'
            },
            {
                name: 'maxPriorityFeePerGas',
                type: 'Option<U256>'
            },
            {
                name: 'nonce',
                type: 'Option<U256>'
            },
            {
                name: 'estimate',
                type: 'bool'
            },
            {
                name: 'accessList',
                type: 'Option<Vec<(H160, Vec<H256>)>>'
            }
        ],
        type: 'Result<EvmCreateInfo, DispatchError>'
    },
    current_all: {
        description: 'Return all the current data for a block in a single runtime call.',
        params: [],
        type: '(Option<BlockV2>, Option<Vec<EthReceiptV3>>, Option<Vec<EthTransactionStatus>>)'
    },
    current_block: {
        description: 'Return the current block.',
        params: [],
        type: 'BlockV2'
    },
    current_receipts: {
        description: 'Return the current receipt.',
        params: [],
        type: 'Option<Vec<EthReceiptV3>>'
    },
    current_transaction_statuses: {
        description: 'Return the current transaction status.',
        params: [],
        type: 'Option<Vec<EthTransactionStatus>>'
    },
    elasticity: {
        description: 'Return the elasticity multiplier.',
        params: [],
        type: 'Option<Permill>'
    },
    extrinsic_filter: {
        description: 'Receives a `Vec<OpaqueExtrinsic>` and filters all the ethereum transactions.',
        params: [
            {
                name: 'xts',
                type: 'Vec<Extrinsic>'
            }
        ],
        type: 'Vec<TransactionV2>'
    },
    gas_price: {
        description: 'Returns FixedGasPrice::min_gas_price',
        params: [],
        type: 'u256'
    },
    storage_at: {
        description: 'For a given account address and index, returns pallet_evm::AccountStorages.',
        params: [
            {
                name: 'address',
                type: 'H160'
            },
            {
                name: 'index',
                type: 'u256'
            }
        ],
        type: 'H256'
    }
};
const ethMethodsV5 = {
    call: {
        description: 'Returns a frame_ethereum::call response. If `estimate` is true,',
        params: [
            {
                name: 'from',
                type: 'H160'
            },
            {
                name: 'to',
                type: 'H160'
            },
            {
                name: 'data',
                type: 'Vec<u8>'
            },
            {
                name: 'value',
                type: 'U256'
            },
            {
                name: 'gasLimit',
                type: 'U256'
            },
            {
                name: 'maxFeePerGas',
                type: 'Option<U256>'
            },
            {
                name: 'maxPriorityFeePerGas',
                type: 'Option<U256>'
            },
            {
                name: 'nonce',
                type: 'Option<U256>'
            },
            {
                name: 'estimate',
                type: 'bool'
            },
            {
                name: 'accessList',
                type: 'Option<Vec<(H160, Vec<H256>)>>'
            }
        ],
        type: 'Result<EvmCallInfoV2, DispatchError>'
    },
    create: {
        description: 'Returns a frame_ethereum::call response. If `estimate` is true,',
        params: [
            {
                name: 'from',
                type: 'H160'
            },
            {
                name: 'data',
                type: 'Vec<u8>'
            },
            {
                name: 'value',
                type: 'U256'
            },
            {
                name: 'gasLimit',
                type: 'U256'
            },
            {
                name: 'maxFeePerGas',
                type: 'Option<U256>'
            },
            {
                name: 'maxPriorityFeePerGas',
                type: 'Option<U256>'
            },
            {
                name: 'nonce',
                type: 'Option<U256>'
            },
            {
                name: 'estimate',
                type: 'bool'
            },
            {
                name: 'accessList',
                type: 'Option<Vec<(H160, Vec<H256>)>>'
            }
        ],
        type: 'Result<EvmCreateInfoV2, DispatchError>'
    }
};
const runtime = {
    ConvertTransactionRuntimeApi: [
        {
            methods: {
                convert_transaction: {
                    description: 'Converts an Ethereum-style transaction to Extrinsic',
                    params: [
                        {
                            name: 'transaction',
                            type: 'TransactionV2'
                        }
                    ],
                    type: 'Extrinsic'
                }
            },
            version: 2
        },
        {
            methods: {
                convert_transaction: {
                    description: 'Converts an Ethereum-style transaction to Extrinsic',
                    params: [
                        {
                            name: 'transaction',
                            type: 'TransactionV3'
                        }
                    ],
                    type: 'Extrinsic'
                }
            },
            version: 3
        }
    ],
    DebugRuntimeApi: [
        {
            methods: {
                trace_block: {
                    description: 'Trace all block extrinsics',
                    params: [
                        {
                            name: 'extrinsics',
                            type: 'Vec<Extrinsic>'
                        },
                        {
                            name: 'knownTransactions',
                            type: 'Vec<H256>'
                        }
                    ],
                    type: 'Result<(), DispatchError>'
                },
                trace_transaction: {
                    description: 'Trace transaction extrinsics',
                    params: [
                        {
                            name: 'extrinsics',
                            type: 'Vec<Extrinsic>'
                        },
                        {
                            name: 'transaction',
                            type: 'EthTransaction'
                        }
                    ],
                    type: 'Result<(), DispatchError>'
                }
            },
            version: 4
        }
    ],
    EthereumRuntimeRPCApi: [
        {
            methods: {
                ...ethMethodsV4
            },
            version: 4
        },
        {
            methods: {
                ...ethMethodsV4,
                ...ethMethodsV5
            },
            version: 5
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/eth/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$eth$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/eth/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$eth$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/eth/runtime.js [app-client] (ecmascript)");
;
;
const V0 = {
    BlockV0: {
        header: 'EthHeader',
        transactions: 'Vec<TransactionV0>',
        ommers: 'Vec<EthHeader>'
    },
    LegacyTransaction: {
        nonce: 'U256',
        gasPrice: 'U256',
        gasLimit: 'U256',
        action: 'EthTransactionAction',
        value: 'U256',
        input: 'Bytes',
        signature: 'EthLegacyTransactionSignature'
    },
    TransactionV0: 'LegacyTransaction'
};
const V1 = {
    BlockV1: {
        header: 'EthHeader',
        transactions: 'Vec<TransactionV1>',
        ommers: 'Vec<EthHeader>'
    },
    EIP2930Transaction: {
        chainId: 'u64',
        nonce: 'U256',
        gasPrice: 'U256',
        gasLimit: 'U256',
        action: 'EthTransactionAction',
        value: 'U256',
        input: 'Bytes',
        accessList: 'EthAccessList',
        signature: 'EthTransactionSignature'
    },
    TransactionV1: {
        _enum: {
            Legacy: 'LegacyTransaction',
            EIP2930: 'EIP2930Transaction'
        }
    }
};
const V2 = {
    BlockV2: {
        header: 'EthHeader',
        transactions: 'Vec<TransactionV2>',
        ommers: 'Vec<EthHeader>'
    },
    EIP1559Transaction: {
        chainId: 'u64',
        nonce: 'U256',
        maxPriorityFeePerGas: 'U256',
        maxFeePerGas: 'U256',
        gasLimit: 'U256',
        action: 'EthTransactionAction',
        value: 'U256',
        input: 'Bytes',
        accessList: 'EthAccessList',
        signature: 'EthTransactionSignature'
    },
    TransactionV2: {
        _enum: {
            Legacy: 'LegacyTransaction',
            EIP2930: 'EIP2930Transaction',
            EIP1559: 'EIP1559Transaction'
        }
    }
};
const V3 = {
    BlockV3: {
        header: 'EthHeader',
        transactions: 'Vec<TransactionV3>',
        ommers: 'Vec<EthHeader>'
    },
    EIP7702Transaction: {
        chainId: 'u64',
        nonce: 'U256',
        maxPriorityFeePerGas: 'U256',
        maxFeePerGas: 'U256',
        gasLimit: 'U256',
        destination: 'EthTransactionAction',
        value: 'U256',
        data: 'Bytes',
        accessList: 'EthAccessList',
        authorizationList: 'EthAuthorizationList',
        signature: 'EthTransactionSignature'
    },
    TransactionV3: {
        _enum: {
            Legacy: 'LegacyTransaction',
            EIP2930: 'EIP2930Transaction',
            EIP1559: 'EIP1559Transaction',
            EIP7702: 'EIP7702Transaction'
        }
    }
};
const types = {
    ...V0,
    ...V1,
    ...V2,
    ...V3,
    EthereumAccountId: 'GenericEthereumAccountId',
    EthereumAddress: 'GenericEthereumAccountId',
    EthereumLookupSource: 'GenericEthereumLookupSource',
    EthereumSignature: '[u8; 65]',
    EthAccessListItem: {
        address: 'EthAddress',
        slots: 'Vec<H256>'
    },
    EthAccessList: 'Vec<EthAccessListItem>',
    EthAuthorizationList: 'Vec<EthAuthorizationListItem>',
    EthAuthorizationListItem: {
        chainId: 'u64',
        address: 'H160',
        nonce: 'U256',
        signature: 'EthAuthorizationSignature'
    },
    EthAuthorizationSignature: {
        oddYParity: 'bool',
        r: 'H256',
        s: 'H256'
    },
    EthAccount: {
        address: 'EthAddress',
        balance: 'U256',
        nonce: 'U256',
        codeHash: 'H256',
        storageHash: 'H256',
        accountProof: 'Vec<Bytes>',
        storageProof: 'Vec<EthStorageProof>'
    },
    EthAddress: 'H160',
    EthBlock: {
        header: 'EthHeader',
        transactions: 'Vec<EthTransaction>',
        ommers: 'Vec<EthHeader>'
    },
    EthHeader: {
        parentHash: 'H256',
        ommersHash: 'H256',
        beneficiary: 'EthAddress',
        stateRoot: 'H256',
        transactionsRoot: 'H256',
        receiptsRoot: 'H256',
        logsBloom: 'EthBloom',
        difficulty: 'U256',
        number: 'U256',
        gasLimit: 'U256',
        gasUsed: 'U256',
        timestamp: 'u64',
        extraData: 'Bytes',
        mixMash: 'H256',
        nonce: 'H64'
    },
    EthRichBlock: {
        _alias: {
            blockHash: 'hash',
            blockSize: 'size'
        },
        blockHash: 'Option<H256>',
        parentHash: 'H256',
        sha3Uncles: 'H256',
        author: 'EthAddress',
        miner: 'EthAddress',
        stateRoot: 'H256',
        transactionsRoot: 'H256',
        receiptsRoot: 'H256',
        number: 'Option<U256>',
        gasUsed: 'U256',
        gasLimit: 'U256',
        extraData: 'Bytes',
        logsBloom: 'EthBloom',
        timestamp: 'U256',
        difficulty: 'U256',
        totalDifficulty: 'Option<U256>',
        sealFields: 'Vec<Bytes>',
        uncles: 'Vec<H256>',
        transactions: 'Vec<EthTransaction>',
        blockSize: 'Option<U256>'
    },
    EthBloom: 'H2048',
    EthCallRequest: {
        from: 'Option<EthAddress>',
        to: 'Option<EthAddress>',
        gasPrice: 'Option<U256>',
        gas: 'Option<U256>',
        value: 'Option<U256>',
        data: 'Option<Bytes>',
        nonce: 'Option<U256>'
    },
    EthFeeHistory: {
        oldestBlock: 'U256',
        baseFeePerGas: 'Vec<U256>',
        gasUsedRatio: 'Vec<f64>',
        reward: 'Option<Vec<Vec<U256>>>'
    },
    EthFilter: {
        fromBlock: 'Option<BlockNumber>',
        toBlock: 'Option<BlockNumber>',
        blockHash: 'Option<H256>',
        address: 'Option<EthFilterAddress>',
        topics: 'Option<EthFilterTopic>'
    },
    EthFilterAddress: {
        _enum: {
            Single: 'EthAddress',
            Multiple: 'Vec<EthAddress>',
            Null: 'Null'
        }
    },
    EthFilterChanges: {
        _enum: {
            Logs: 'Vec<EthLog>',
            Hashes: 'Vec<H256>',
            Empty: 'Null'
        }
    },
    EthFilterTopic: {
        _enum: {
            Single: 'EthFilterTopicInner',
            Multiple: 'Vec<EthFilterTopicInner>',
            Null: 'Null'
        }
    },
    EthFilterTopicEntry: 'Option<H256>',
    EthFilterTopicInner: {
        _enum: {
            Single: 'EthFilterTopicEntry',
            Multiple: 'Vec<EthFilterTopicEntry>',
            Null: 'Null'
        }
    },
    EthRichHeader: {
        _alias: {
            blockHash: 'hash',
            blockSize: 'size'
        },
        blockHash: 'Option<H256>',
        parentHash: 'H256',
        sha3Uncles: 'H256',
        author: 'EthAddress',
        miner: 'EthAddress',
        stateRoot: 'H256',
        transactionsRoot: 'H256',
        receiptsRoot: 'H256',
        number: 'Option<U256>',
        gasUsed: 'U256',
        gasLimit: 'U256',
        extraData: 'Bytes',
        logsBloom: 'EthBloom',
        timestamp: 'U256',
        difficulty: 'U256',
        sealFields: 'Vec<Bytes>',
        blockSize: 'Option<U256>'
    },
    EthLog: {
        address: 'EthAddress',
        topics: 'Vec<H256>',
        data: 'Bytes',
        blockHash: 'Option<H256>',
        blockNumber: 'Option<U256>',
        transactionHash: 'Option<H256>',
        transactionIndex: 'Option<U256>',
        logIndex: 'Option<U256>',
        transactionLogIndex: 'Option<U256>',
        removed: 'bool'
    },
    EthReceipt: {
        transactionHash: 'Option<H256>',
        transactionIndex: 'Option<U256>',
        blockHash: 'Option<H256>',
        from: 'Option<EthAddress>',
        to: 'Option<EthAddress>',
        blockNumber: 'Option<U256>',
        cumulativeGasUsed: 'U256',
        gasUsed: 'Option<U256>',
        contractAddress: 'Option<EthAddress>',
        logs: 'Vec<EthLog>',
        root: 'Option<H256>',
        logsBloom: 'EthBloom',
        statusCode: 'Option<U64>'
    },
    // not convinced, however the original commit matches, so... (maybe V3 is incorrect?)
    EthReceiptV0: 'EthReceipt',
    EthReceiptV3: 'EthReceipt',
    EthReceiptV4: 'EthReceipt',
    EthStorageProof: {
        key: 'U256',
        value: 'U256',
        proof: 'Vec<Bytes>'
    },
    EthSubKind: {
        _enum: [
            'newHeads',
            'logs',
            'newPendingTransactions',
            'syncing'
        ]
    },
    EthSubParams: {
        _enum: {
            None: 'Null',
            Logs: 'EthFilter'
        }
    },
    EthSubResult: {
        _enum: {
            Header: 'EthRichHeader',
            Log: 'EthLog',
            TransactionHash: 'H256',
            SyncState: 'EthSyncStatus'
        }
    },
    EthSyncInfo: {
        startingBlock: 'U256',
        currentBlock: 'U256',
        highestBlock: 'U256',
        warpChunksAmount: 'Option<U256>',
        warpChunksProcessed: 'Option<U256>'
    },
    EthSyncStatus: {
        _enum: {
            Info: 'EthSyncInfo',
            None: 'Null'
        }
    },
    EthTransaction: {
        hash: 'H256',
        nonce: 'U256',
        blockHash: 'Option<H256>',
        blockNumber: 'Option<U256>',
        transactionIndex: 'Option<U256>',
        from: 'H160',
        to: 'Option<H160>',
        value: 'U256',
        gasPrice: 'Option<U256>',
        maxFeePerGas: 'Option<U256>',
        maxPriorityFeePerGas: 'Option<U256>',
        gas: 'U256',
        input: 'Bytes',
        creates: 'Option<H160>',
        raw: 'Bytes',
        publicKey: 'Option<H512>',
        chainId: 'Option<U64>',
        standardV: 'U256',
        v: 'U256',
        r: 'U256',
        s: 'U256',
        accessList: 'Option<Vec<EthAccessListItem>>',
        transactionType: 'Option<U256>'
    },
    EthLegacyTransactionSignature: {
        v: 'u64',
        r: 'H256',
        s: 'H256'
    },
    EthTransactionSignature: {
        oddYParity: 'bool',
        r: 'H256',
        s: 'H256'
    },
    EthTransactionAction: {
        _enum: {
            Call: 'H160',
            Create: 'Null'
        }
    },
    EthTransactionCondition: {
        _enum: {
            block: 'u64',
            time: 'u64'
        }
    },
    EthTransactionRequest: {
        from: 'Option<EthAddress>',
        to: 'Option<EthAddress>',
        gasPrice: 'Option<U256>',
        gas: 'Option<U256>',
        value: 'Option<U256>',
        data: 'Option<Bytes>',
        nonce: 'Option<U256>'
    },
    EthTransactionStatus: {
        transactionHash: 'H256',
        transactionIndex: 'u32',
        from: 'EthAddress',
        to: 'Option<EthAddress>',
        contractAddress: 'Option<EthAddress>',
        logs: 'Vec<EthLog>',
        logsBloom: 'EthBloom'
    },
    EthWork: {
        powHash: 'H256',
        seedHash: 'H256',
        target: 'H256',
        number: 'Option<u64>'
    }
};
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$eth$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$eth$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/nimbus/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    // deprecated, the NimbusApi is current - this is for backwards compat
    AuthorFilterAPI: [
        {
            methods: {
                can_author: {
                    description: 'The runtime api used to predict whether an author will be eligible in the given slot',
                    params: [
                        {
                            name: 'author',
                            type: 'AccountId'
                        },
                        {
                            name: 'relayParent',
                            type: 'u32'
                        },
                        {
                            name: 'parentHeader',
                            type: 'Header'
                        }
                    ],
                    type: 'bool'
                }
            },
            version: 2
        },
        {
            methods: {
                can_author: {
                    description: 'The runtime api used to predict whether an author will be eligible in the given slot',
                    params: [
                        {
                            name: 'author',
                            type: 'AccountId'
                        },
                        {
                            name: 'relayParent',
                            type: 'u32'
                        }
                    ],
                    type: 'bool'
                }
            },
            version: 1
        }
    ],
    NimbusApi: [
        {
            methods: {
                can_author: {
                    description: 'The runtime api used to predict whether a Nimbus author will be eligible in the given slot',
                    params: [
                        {
                            name: 'author',
                            type: 'AccountId'
                        },
                        {
                            name: 'relayParent',
                            type: 'u32'
                        },
                        {
                            name: 'parentHeader',
                            type: 'Header'
                        }
                    ],
                    type: 'bool'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/nimbus/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$nimbus$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/nimbus/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$nimbus$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {}
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/ormlOracle/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    // https://github.com/open-web3-stack/open-runtime-module-library/blob/b57f88b39cd547e2fb51727d8bb9bcc64fddf8b5/oracle/rpc/runtime-api/src/lib.rs#L12-L21
    OracleApi: [
        {
            methods: {
                get_all_values: {
                    description: 'Retrieves all values',
                    params: [
                        {
                            name: 'providerId',
                            // This is a Codec type
                            type: 'Raw'
                        }
                    ],
                    // This won't actually work as expected - since we have
                    // no information about the actual Raw sizes, we cannot
                    // handle it in this format (it would need an override
                    // for the specific Codec). So return the Raw value.
                    // type: 'Vec<(Raw, Option<Raw>)>'
                    type: 'Raw'
                },
                get_value: {
                    description: 'Retrieves a single value',
                    params: [
                        {
                            name: 'providerId',
                            // This is a Codec type
                            type: 'Raw'
                        },
                        {
                            name: 'key',
                            // This is a Codec type
                            type: 'Raw'
                        }
                    ],
                    // This is an Option<Codec> type
                    type: 'Option<Raw>'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/ormlOracle/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$ormlOracle$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/ormlOracle/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$ormlOracle$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {}
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/ormlTokens/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    // https://github.com/open-web3-stack/open-runtime-module-library/blob/b57f88b39cd547e2fb51727d8bb9bcc64fddf8b5/tokens/rpc/runtime-api/src/lib.rs#L11-L18
    TokensApi: [
        {
            methods: {
                query_existential_deposit: {
                    description: 'Query the existential amount for a specific currency',
                    params: [
                        {
                            name: 'currencyId',
                            // This is CurrencyId, as per the return value, we are unsure
                            // if this is specialized and/or global to the chain or not
                            type: 'Raw'
                        }
                    ],
                    // This is Balance - since we don't understand enough about the way
                    // in which this is used, we default to u128 here (it certainly could
                    // be a specialized type that doesn't map to the on-chain Balance)
                    type: 'u128'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/ormlTokens/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$ormlTokens$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/ormlTokens/runtime.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: {},
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$ormlTokens$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {}
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/rpc/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    methods: {
        description: 'Retrieves the list of RPC methods that are exposed by the node',
        params: [],
        type: 'RpcMethods'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/rpc/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/rpc/rpc.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    types: {
        RpcMethods: {
            version: 'u32',
            methods: 'Vec<Text>'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/author/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    hasKey: {
        description: 'Returns true if the keystore has private keys for the given public key and key type.',
        isUnsafe: true,
        params: [
            {
                name: 'publicKey',
                type: 'Bytes'
            },
            {
                name: 'keyType',
                type: 'Text'
            }
        ],
        type: 'bool'
    },
    hasSessionKeys: {
        description: 'Returns true if the keystore has private keys for the given session public keys.',
        isUnsafe: true,
        params: [
            {
                name: 'sessionKeys',
                type: 'Bytes'
            }
        ],
        type: 'bool'
    },
    insertKey: {
        description: 'Insert a key into the keystore.',
        isUnsafe: true,
        params: [
            {
                name: 'keyType',
                type: 'Text'
            },
            {
                name: 'suri',
                type: 'Text'
            },
            {
                name: 'publicKey',
                type: 'Bytes'
            }
        ],
        type: 'Bytes'
    },
    pendingExtrinsics: {
        description: 'Returns all pending extrinsics, potentially grouped by sender',
        params: [],
        type: 'Vec<Extrinsic>'
    },
    removeExtrinsic: {
        description: 'Remove given extrinsic from the pool and temporarily ban it to prevent reimporting',
        isUnsafe: true,
        params: [
            {
                name: 'bytesOrHash',
                type: 'Vec<ExtrinsicOrHash>'
            }
        ],
        type: 'Vec<Hash>'
    },
    rotateKeys: {
        description: 'Generate new session keys and returns the corresponding public keys',
        isUnsafe: true,
        params: [],
        type: 'Bytes'
    },
    submitAndWatchExtrinsic: {
        description: 'Submit and subscribe to watch an extrinsic until unsubscribed',
        isSigned: true,
        params: [
            {
                name: 'extrinsic',
                type: 'Extrinsic'
            }
        ],
        pubsub: [
            'extrinsicUpdate',
            'submitAndWatchExtrinsic',
            'unwatchExtrinsic'
        ],
        type: 'ExtrinsicStatus'
    },
    submitExtrinsic: {
        description: 'Submit a fully formatted extrinsic for block inclusion',
        isSigned: true,
        params: [
            {
                name: 'extrinsic',
                type: 'Extrinsic'
            }
        ],
        type: 'Hash'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/author/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$author$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/author/rpc.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$author$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    types: {
        ExtrinsicOrHash: {
            _enum: {
                Hash: 'Hash',
                Extrinsic: 'Bytes'
            }
        },
        ExtrinsicStatus: {
            _enum: {
                Future: 'Null',
                Ready: 'Null',
                Broadcast: 'Vec<Text>',
                InBlock: 'Hash',
                Retracted: 'Hash',
                FinalityTimeout: 'Hash',
                Finalized: 'Hash',
                Usurped: 'Hash',
                Dropped: 'Null',
                Invalid: 'Null'
            }
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/chain/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    getBlock: {
        description: 'Get header and body of a relay chain block',
        params: [
            {
                isHistoric: true,
                isOptional: true,
                name: 'hash',
                type: 'BlockHash'
            }
        ],
        type: 'SignedBlock'
    },
    getBlockHash: {
        description: 'Get the block hash for a specific block',
        params: [
            {
                isOptional: true,
                name: 'blockNumber',
                type: 'BlockNumber'
            }
        ],
        type: 'BlockHash'
    },
    getFinalizedHead: {
        alias: [
            'chain_getFinalisedHead'
        ],
        description: 'Get hash of the last finalized block in the canon chain',
        params: [],
        type: 'BlockHash'
    },
    getHeader: {
        alias: [
            'chain_getHead'
        ],
        description: 'Retrieves the header for a specific block',
        params: [
            {
                isHistoric: true,
                isOptional: true,
                name: 'hash',
                type: 'BlockHash'
            }
        ],
        type: 'Header'
    },
    subscribeAllHeads: {
        description: 'Retrieves the newest header via subscription',
        params: [],
        pubsub: [
            'allHead',
            'subscribeAllHeads',
            'unsubscribeAllHeads'
        ],
        type: 'Header'
    },
    subscribeFinalizedHeads: {
        alias: [
            'chain_subscribeFinalisedHeads',
            'chain_unsubscribeFinalisedHeads'
        ],
        description: 'Retrieves the best finalized header via subscription',
        params: [],
        pubsub: [
            'finalizedHead',
            'subscribeFinalizedHeads',
            'unsubscribeFinalizedHeads'
        ],
        type: 'Header'
    },
    subscribeNewHeads: {
        alias: [
            'chain_unsubscribeNewHeads',
            'subscribe_newHead',
            'unsubscribe_newHead'
        ],
        description: 'Retrieves the best header via subscription',
        params: [],
        // NOTE These still has the aliassed version, compatible with 1.x
        pubsub: [
            'newHead',
            'subscribeNewHead',
            'unsubscribeNewHead'
        ],
        type: 'Header'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/chain/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$chain$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/chain/rpc.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$chain$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    types: {
        BlockHash: 'Hash'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/childstate/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    getKeys: {
        description: 'Returns the keys with prefix from a child storage, leave empty to get all the keys',
        params: [
            {
                name: 'childKey',
                type: 'PrefixedStorageKey'
            },
            {
                name: 'prefix',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'Hash'
            }
        ],
        type: 'Vec<StorageKey>'
    },
    getKeysPaged: {
        alias: [
            'childstate_getKeysPagedAt'
        ],
        description: 'Returns the keys with prefix from a child storage with pagination support',
        params: [
            {
                name: 'childKey',
                type: 'PrefixedStorageKey'
            },
            {
                name: 'prefix',
                type: 'StorageKey'
            },
            {
                name: 'count',
                type: 'u32'
            },
            {
                isOptional: true,
                name: 'startKey',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'Hash'
            }
        ],
        type: 'Vec<StorageKey>'
    },
    getStorage: {
        description: 'Returns a child storage entry at a specific block state',
        params: [
            {
                name: 'childKey',
                type: 'PrefixedStorageKey'
            },
            {
                name: 'key',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'Hash'
            }
        ],
        type: 'Option<StorageData>'
    },
    getStorageEntries: {
        description: 'Returns child storage entries for multiple keys at a specific block state',
        params: [
            {
                name: 'childKey',
                type: 'PrefixedStorageKey'
            },
            {
                name: 'keys',
                type: 'Vec<StorageKey>'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'Hash'
            }
        ],
        type: 'Vec<Option<StorageData>>'
    },
    getStorageHash: {
        description: 'Returns the hash of a child storage entry at a block state',
        params: [
            {
                name: 'childKey',
                type: 'PrefixedStorageKey'
            },
            {
                name: 'key',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'Hash'
            }
        ],
        type: 'Option<Hash>'
    },
    getStorageSize: {
        description: 'Returns the size of a child storage entry at a block state',
        params: [
            {
                name: 'childKey',
                type: 'PrefixedStorageKey'
            },
            {
                name: 'key',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'Hash'
            }
        ],
        type: 'Option<u64>'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/childstate/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$childstate$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/childstate/rpc.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$childstate$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    types: {
        // StorageKey extends Bytes
        PrefixedStorageKey: 'StorageKey'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/offchain/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    localStorageClear: {
        description: 'Clear offchain local storage under given key and prefix',
        isUnsafe: true,
        params: [
            {
                name: 'kind',
                type: 'StorageKind'
            },
            {
                name: 'key',
                type: 'Bytes'
            }
        ],
        type: 'Null'
    },
    localStorageGet: {
        description: 'Get offchain local storage under given key and prefix',
        isUnsafe: true,
        params: [
            {
                name: 'kind',
                type: 'StorageKind'
            },
            {
                name: 'key',
                type: 'Bytes'
            }
        ],
        type: 'Option<Bytes>'
    },
    localStorageSet: {
        description: 'Set offchain local storage under given key and prefix',
        isUnsafe: true,
        params: [
            {
                name: 'kind',
                type: 'StorageKind'
            },
            {
                name: 'key',
                type: 'Bytes'
            },
            {
                name: 'value',
                type: 'Bytes'
            }
        ],
        type: 'Null'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/offchain/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const runtime = {
    OffchainWorkerApi: [
        {
            methods: {
                offchain_worker: {
                    description: 'Starts the off-chain task for given block header.',
                    params: [
                        {
                            name: 'header',
                            type: 'Header'
                        }
                    ],
                    type: 'Null'
                }
            },
            version: 2
        },
        {
            methods: {
                offchain_worker: {
                    description: 'Starts the off-chain task for given block header.',
                    params: [
                        {
                            name: 'number',
                            type: 'BlockNumber'
                        }
                    ],
                    type: 'Null'
                }
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/offchain/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$offchain$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/offchain/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$offchain$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/offchain/runtime.js [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$offchain$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$offchain$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        StorageKind: {
            _enum: {
                PERSISTENT: 1,
                LOCAL: 2
            }
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/payment/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    queryFeeDetails: {
        // NOTE: Not deprecated (yet) in Substrate, but it is the intent to do so
        deprecated: 'Use `api.call.transactionPaymentApi.queryFeeDetails` instead',
        description: 'Query the detailed fee of a given encoded extrinsic',
        params: [
            {
                name: 'extrinsic',
                type: 'Bytes'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'FeeDetails'
    },
    queryInfo: {
        // NOTE: Not deprecated (yet) in Substrate, but it is the intent to do so
        deprecated: 'Use `api.call.transactionPaymentApi.queryInfo` instead',
        description: 'Retrieves the fee information for an encoded extrinsic',
        params: [
            {
                name: 'extrinsic',
                type: 'Bytes'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        // NOTE: Stuck on V1 forever (at least for the time being)
        type: 'RuntimeDispatchInfoV1'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/payment/runtime.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runtime",
    ()=>runtime
]);
const V1_TO_V4_SHARED_PAY = {
    query_fee_details: {
        description: 'The transaction fee details',
        params: [
            {
                name: 'uxt',
                type: 'Extrinsic'
            },
            {
                name: 'len',
                type: 'u32'
            }
        ],
        type: 'FeeDetails'
    }
};
const V1_TO_V3_SHARED_CALL = {
    query_call_fee_details: {
        description: 'The call fee details',
        params: [
            {
                name: 'call',
                type: 'Call'
            },
            {
                name: 'len',
                type: 'u32'
            }
        ],
        type: 'FeeDetails'
    }
};
const V2_TO_V4_SHARED_PAY = {
    query_info: {
        description: 'The transaction info',
        params: [
            {
                name: 'uxt',
                type: 'Extrinsic'
            },
            {
                name: 'len',
                type: 'u32'
            }
        ],
        type: 'RuntimeDispatchInfo'
    }
};
const V2_V3_SHARED_CALL = {
    query_call_info: {
        description: 'The call info',
        params: [
            {
                name: 'call',
                type: 'Call'
            },
            {
                name: 'len',
                type: 'u32'
            }
        ],
        type: 'RuntimeDispatchInfo'
    }
};
const V3_SHARED_PAY_CALL = {
    query_length_to_fee: {
        description: 'Query the output of the current LengthToFee given some input',
        params: [
            {
                name: 'length',
                type: 'u32'
            }
        ],
        type: 'Balance'
    },
    query_weight_to_fee: {
        description: 'Query the output of the current WeightToFee given some input',
        params: [
            {
                name: 'weight',
                type: 'Weight'
            }
        ],
        type: 'Balance'
    }
};
const runtime = {
    TransactionPaymentApi: [
        {
            // V4 is equivalent to V3 (V4 just dropped all V1 references)
            methods: {
                ...V3_SHARED_PAY_CALL,
                ...V2_TO_V4_SHARED_PAY,
                ...V1_TO_V4_SHARED_PAY
            },
            version: 4
        },
        {
            methods: {
                ...V3_SHARED_PAY_CALL,
                ...V2_TO_V4_SHARED_PAY,
                ...V1_TO_V4_SHARED_PAY
            },
            version: 3
        },
        {
            methods: {
                ...V2_TO_V4_SHARED_PAY,
                ...V1_TO_V4_SHARED_PAY
            },
            version: 2
        },
        {
            methods: {
                query_info: {
                    description: 'The transaction info',
                    params: [
                        {
                            name: 'uxt',
                            type: 'Extrinsic'
                        },
                        {
                            name: 'len',
                            type: 'u32'
                        }
                    ],
                    // NOTE: _Should_ be V1 (as per current Substrate), however the interface was
                    // changed mid-flight between versions. So we have some of each depending on
                    // runtime. (We do detect the weight type, so correct)
                    type: 'RuntimeDispatchInfo'
                },
                ...V1_TO_V4_SHARED_PAY
            },
            version: 1
        }
    ],
    TransactionPaymentCallApi: [
        {
            methods: {
                ...V3_SHARED_PAY_CALL,
                ...V2_V3_SHARED_CALL,
                ...V1_TO_V3_SHARED_CALL
            },
            version: 3
        },
        {
            methods: {
                ...V2_V3_SHARED_CALL,
                ...V1_TO_V3_SHARED_CALL
            },
            version: 2
        },
        {
            methods: {
                CALL: {
                    description: 'The call info',
                    params: [
                        {
                            name: 'call',
                            type: 'Call'
                        },
                        {
                            name: 'len',
                            type: 'u32'
                        }
                    ],
                    // NOTE: As per the above comment, the below is correct according to Substrate, but
                    // _may_ yield fallback decoding on some versions of the runtime
                    type: 'RuntimeDispatchInfo'
                },
                ...V1_TO_V3_SHARED_CALL
            },
            version: 1
        }
    ]
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/payment/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$payment$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/payment/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$payment$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/payment/runtime.js [app-client] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$payment$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$payment$2f$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    types: {
        FeeDetails: {
            inclusionFee: 'Option<InclusionFee>'
        },
        InclusionFee: {
            baseFee: 'Balance',
            lenFee: 'Balance',
            adjustedWeightFee: 'Balance'
        },
        RuntimeDispatchInfo: {
            weight: 'Weight',
            class: 'DispatchClass',
            partialFee: 'Balance'
        },
        RuntimeDispatchInfoV1: {
            weight: 'WeightV1',
            class: 'DispatchClass',
            partialFee: 'Balance'
        },
        RuntimeDispatchInfoV2: {
            weight: 'WeightV2',
            class: 'DispatchClass',
            partialFee: 'Balance'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/state/rpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpc",
    ()=>rpc
]);
const rpc = {
    call: {
        alias: [
            'state_callAt'
        ],
        description: 'Perform a call to a builtin on the chain',
        params: [
            {
                name: 'method',
                type: 'Text'
            },
            {
                name: 'data',
                type: 'Bytes'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'Bytes'
    },
    getChildKeys: {
        description: 'Retrieves the keys with prefix of a specific child storage',
        params: [
            {
                name: 'childStorageKey',
                type: 'StorageKey'
            },
            {
                name: 'childDefinition',
                type: 'StorageKey'
            },
            {
                name: 'childType',
                type: 'u32'
            },
            {
                name: 'key',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'Vec<StorageKey>'
    },
    getChildReadProof: {
        description: 'Returns proof of storage for child key entries at a specific block state.',
        params: [
            {
                name: 'childStorageKey',
                type: 'PrefixedStorageKey'
            },
            {
                name: 'keys',
                type: 'Vec<StorageKey>'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'ReadProof'
    },
    getChildStorage: {
        description: 'Retrieves the child storage for a key',
        params: [
            {
                name: 'childStorageKey',
                type: 'StorageKey'
            },
            {
                name: 'childDefinition',
                type: 'StorageKey'
            },
            {
                name: 'childType',
                type: 'u32'
            },
            {
                name: 'key',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'StorageData'
    },
    getChildStorageHash: {
        description: 'Retrieves the child storage hash',
        params: [
            {
                name: 'childStorageKey',
                type: 'StorageKey'
            },
            {
                name: 'childDefinition',
                type: 'StorageKey'
            },
            {
                name: 'childType',
                type: 'u32'
            },
            {
                name: 'key',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'Hash'
    },
    getChildStorageSize: {
        description: 'Retrieves the child storage size',
        params: [
            {
                name: 'childStorageKey',
                type: 'StorageKey'
            },
            {
                name: 'childDefinition',
                type: 'StorageKey'
            },
            {
                name: 'childType',
                type: 'u32'
            },
            {
                name: 'key',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'u64'
    },
    getKeys: {
        deprecated: 'Use `api.rpc.state.getKeysPaged` to retrieve keys',
        description: 'Retrieves the keys with a certain prefix',
        params: [
            {
                name: 'key',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'Vec<StorageKey>'
    },
    getKeysPaged: {
        alias: [
            'state_getKeysPagedAt'
        ],
        description: 'Returns the keys with prefix with pagination support.',
        params: [
            {
                name: 'key',
                type: 'StorageKey'
            },
            {
                name: 'count',
                type: 'u32'
            },
            {
                isOptional: true,
                name: 'startKey',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'Vec<StorageKey>'
    },
    getMetadata: {
        description: 'Returns the runtime metadata',
        params: [
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'Metadata'
    },
    getPairs: {
        deprecated: 'Use `api.rpc.state.getKeysPaged` to retrieve keys',
        description: 'Returns the keys with prefix, leave empty to get all the keys (deprecated: Use getKeysPaged)',
        isUnsafe: true,
        params: [
            {
                name: 'prefix',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'Vec<KeyValue>'
    },
    getReadProof: {
        description: 'Returns proof of storage entries at a specific block state',
        params: [
            {
                name: 'keys',
                type: 'Vec<StorageKey>'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'ReadProof'
    },
    getRuntimeVersion: {
        alias: [
            'chain_getRuntimeVersion'
        ],
        description: 'Get the runtime version',
        params: [
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'RuntimeVersion'
    },
    getStorage: {
        alias: [
            'state_getStorageAt'
        ],
        description: 'Retrieves the storage for a key',
        params: [
            {
                name: 'key',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'StorageData'
    },
    getStorageHash: {
        alias: [
            'state_getStorageHashAt'
        ],
        description: 'Retrieves the storage hash',
        params: [
            {
                name: 'key',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'Hash'
    },
    getStorageSize: {
        alias: [
            'state_getStorageSizeAt'
        ],
        description: 'Retrieves the storage size',
        params: [
            {
                name: 'key',
                type: 'StorageKey'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'u64'
    },
    queryStorage: {
        description: 'Query historical storage entries (by key) starting from a start block',
        isUnsafe: true,
        params: [
            {
                name: 'keys',
                type: 'Vec<StorageKey>'
            },
            {
                name: 'fromBlock',
                type: 'Hash'
            },
            {
                isOptional: true,
                name: 'toBlock',
                type: 'BlockHash'
            }
        ],
        type: 'Vec<StorageChangeSet>'
    },
    queryStorageAt: {
        description: 'Query storage entries (by key) starting at block hash given as the second parameter',
        params: [
            {
                name: 'keys',
                type: 'Vec<StorageKey>'
            },
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'Vec<StorageChangeSet>'
    },
    subscribeRuntimeVersion: {
        alias: [
            'chain_subscribeRuntimeVersion',
            'chain_unsubscribeRuntimeVersion'
        ],
        description: 'Retrieves the runtime version via subscription',
        params: [],
        pubsub: [
            'runtimeVersion',
            'subscribeRuntimeVersion',
            'unsubscribeRuntimeVersion'
        ],
        type: 'RuntimeVersion'
    },
    subscribeStorage: {
        description: 'Subscribes to storage changes for the provided keys',
        // NOTE Just marking it here to follow the logic - this is unsafe when no
        // keys are provided (i.e. subscribing to all), generally this is used
        // extensively with normal subscriptions
        // isUnsafe: true,
        params: [
            {
                isOptional: true,
                name: 'keys',
                type: 'Vec<StorageKey>'
            }
        ],
        pubsub: [
            'storage',
            'subscribeStorage',
            'unsubscribeStorage'
        ],
        type: 'StorageChangeSet'
    },
    traceBlock: {
        description: 'Provides a way to trace the re-execution of a single block',
        isUnsafe: true,
        params: [
            {
                name: 'block',
                type: 'Hash'
            },
            {
                name: 'targets',
                type: 'Option<Text>'
            },
            {
                name: 'storageKeys',
                type: 'Option<Text>'
            },
            {
                name: 'methods',
                type: 'Option<Text>'
            }
        ],
        type: 'TraceBlockResponse'
    },
    trieMigrationStatus: {
        description: 'Check current migration state',
        isUnsafe: true,
        params: [
            {
                isHistoric: true,
                isOptional: true,
                name: 'at',
                type: 'BlockHash'
            }
        ],
        type: 'MigrationStatusResult'
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/state/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$state$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/state/rpc.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = {
    rpc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$state$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpc"],
    types: {
        ApiId: '[u8; 8]',
        BlockTrace: {
            blockHash: 'Text',
            parentHash: 'Text',
            tracingTargets: 'Text',
            storageKeys: 'Text',
            spans: 'Vec<BlockTraceSpan>',
            events: 'Vec<BlockTraceEvent>'
        },
        BlockTraceEvent: {
            target: 'Text',
            data: 'BlockTraceEventData',
            parentId: 'Option<u64>'
        },
        BlockTraceEventData: {
            stringValues: 'HashMap<Text, Text>'
        },
        BlockTraceSpan: {
            id: 'u64',
            parentId: 'Option<u64>',
            name: 'Text',
            target: 'Text',
            wasm: 'bool'
        },
        KeyValueOption: '(StorageKey, Option<StorageData>)',
        MigrationStatusResult: {
            topRemainingToMigrate: 'u64',
            childRemainingToMigrate: 'u64'
        },
        ReadProof: {
            at: 'Hash',
            proof: 'Vec<Bytes>'
        },
        RuntimeVersionApi: '(ApiId, u32)',
        RuntimeVersion: {
            specName: 'Text',
            implName: 'Text',
            authoringVersion: 'u32',
            specVersion: 'u32',
            implVersion: 'u32',
            apis: 'Vec<RuntimeVersionApi>',
            transactionVersion: 'u32',
            stateVersion: 'u8'
        },
        RuntimeVersionPre4: {
            specName: 'Text',
            implName: 'Text',
            authoringVersion: 'u32',
            specVersion: 'u32',
            implVersion: 'u32',
            apis: 'Vec<RuntimeVersionApi>',
            transactionVersion: 'u32'
        },
        RuntimeVersionPre3: {
            specName: 'Text',
            implName: 'Text',
            authoringVersion: 'u32',
            specVersion: 'u32',
            implVersion: 'u32',
            apis: 'Vec<RuntimeVersionApi>'
        },
        RuntimeVersionPartial: {
            specName: 'Text',
            specVersion: 'u32',
            apis: 'Vec<RuntimeVersionApi>'
        },
        SpecVersion: 'u32',
        StorageChangeSet: {
            block: 'Hash',
            changes: 'Vec<KeyValueOption>'
        },
        TraceBlockResponse: {
            _enum: {
                TraceError: 'TraceError',
                BlockTrace: 'BlockTrace'
            }
        },
        TraceError: {
            error: 'Text'
        }
    }
};
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/definitions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assetConversion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$assetConversion$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "assets",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$assets$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "attestations",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$attestations$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "aura",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$aura$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "author",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$author$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "authorship",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$authorship$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "babe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$babe$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "balances",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$balances$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "beefy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$beefy$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "benchmark",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$benchmark$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "blockbuilder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$blockbuilder$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "bridges",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$bridges$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "chain",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$chain$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "childstate",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$childstate$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "claims",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$claims$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "collective",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$collective$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "consensus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$consensus$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "contracts",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$contracts$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "contractsAbi",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$contractsAbi$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "crowdloan",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$crowdloan$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "cumulus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$cumulus$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "democracy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$democracy$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "dev",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$dev$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "discovery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$discovery$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "dryRunApi",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$dryRunApi$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "elections",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$elections$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "engine",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$engine$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "eth",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$eth$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "evm",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$evm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "extrinsics",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$extrinsics$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "finality",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$finality$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "fungibles",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$fungibles$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "genericAsset",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$genericAsset$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "genesisBuilder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$genesisBuilder$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "gilt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$gilt$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "grandpa",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$grandpa$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "identity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$identity$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "imOnline",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$imOnline$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "lottery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$lottery$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "metadata",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$essentials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["metadata"],
    "mixnet",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$mixnet$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "mmr",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$mmr$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "nfts",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$nfts$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "nimbus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$nimbus$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "nompools",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$nompools$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "offchain",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$offchain$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "offences",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$offences$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "ormlOracle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$ormlOracle$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "ormlTokens",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$ormlTokens$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "parachains",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$parachains$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "payment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$payment$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "poll",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$poll$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "pow",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$pow$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "proxy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$proxy$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "purchase",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$purchase$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "recovery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$recovery$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "rpc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$rpc$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "runtime",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$essentials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runtime"],
    "scaleInfo",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$essentials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scaleInfo"],
    "scheduler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$scheduler$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "session",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$session$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "society",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$society$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "staking",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$staking$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "state",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$state$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "statement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$statement$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "support",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$support$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "syncstate",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$syncstate$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "system",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$system$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "treasury",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$treasury$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "txpayment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$txpayment$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "txqueue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$txqueue$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "uniques",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$uniques$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "utility",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$utility$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "vesting",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$vesting$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "xcm",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "xcmPaymentApi",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcmPaymentApi$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "xcmRuntimeApi",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcmRuntimeApi$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/definitions.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$essentials$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/essentials.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$assetConversion$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/assetConversion/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$assets$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/assets/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$aura$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/aura/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$authorship$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/authorship/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$babe$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/babe/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$balances$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/balances/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$beefy$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/beefy/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$benchmark$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/benchmark/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$blockbuilder$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/blockbuilder/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$collective$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/collective/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$consensus$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/consensus/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$contracts$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/contracts/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$democracy$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/democracy/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$dev$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/dev/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$discovery$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/discovery/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$elections$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/elections/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$engine$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/engine/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$evm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/evm/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$extrinsics$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/extrinsics/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$fungibles$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/fungibles/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$genericAsset$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/genericAsset/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$genesisBuilder$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/genesisBuilder/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$gilt$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/gilt/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$grandpa$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/grandpa/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$identity$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/identity/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$imOnline$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/imOnline/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$lottery$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/lottery/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$mixnet$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/mixnet/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$mmr$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/mmr/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$nfts$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/nfts/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$nompools$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/nompools/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$offences$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/offences/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$pow$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/pow/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$proxy$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/proxy/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$recovery$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/recovery/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$scheduler$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/scheduler/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$session$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/session/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$society$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/society/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$staking$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/staking/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$statement$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/statement/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$support$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/support/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$syncstate$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/syncstate/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$system$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/system/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$treasury$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/treasury/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$txpayment$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/txpayment/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$txqueue$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/txqueue/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$uniques$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/uniques/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$utility$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/utility/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$vesting$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/vesting/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$attestations$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/attestations/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$bridges$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/bridges/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$claims$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/claims/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$crowdloan$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/crowdloan/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$cumulus$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/cumulus/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$finality$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/finality/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$parachains$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/parachains/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$poll$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/poll/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$purchase$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/purchase/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$dryRunApi$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/dryRunApi/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcm$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcm/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcmPaymentApi$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcmPaymentApi/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$xcmRuntimeApi$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/xcmRuntimeApi/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$contractsAbi$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/contractsAbi/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$eth$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/eth/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$nimbus$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/nimbus/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$ormlOracle$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/ormlOracle/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$ormlTokens$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/ormlTokens/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$rpc$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/rpc/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$author$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/author/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$chain$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/chain/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$childstate$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/childstate/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$offchain$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/offchain/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$payment$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/payment/definitions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$state$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/state/definitions.js [app-client] (ecmascript)");
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/jsonrpc.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$util$2f$object$2f$spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/util/object/spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/definitions.js [app-client] (ecmascript)");
;
;
const jsonrpc = {};
Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__).forEach((s)=>Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$definitions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[s].rpc || {}).forEach(([method, def])=>{
        // allow for section overrides
        const section = def.aliasSection || s;
        if (!jsonrpc[section]) {
            jsonrpc[section] = {};
        }
        jsonrpc[section][method] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$util$2f$object$2f$spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["objectSpread"])({}, def, {
            isSubscription: !!def.pubsub,
            jsonrpc: `${section}_${method}`,
            method,
            section
        });
    }));
const __TURBOPACK__default__export__ = jsonrpc;
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/jsonrpc.js [app-client] (ecmascript) <export default as rpcDefinitions>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpcDefinitions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$jsonrpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$interfaces$2f$jsonrpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/interfaces/jsonrpc.js [app-client] (ecmascript)");
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/metadata/util/getSiName.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSiName",
    ()=>getSiName
]);
function getSiName(lookup, type) {
    const typeDef = lookup.getTypeDef(type);
    return typeDef.lookupName || typeDef.type;
}
}),
"[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/util/storage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "unwrapStorageSi",
    ()=>unwrapStorageSi,
    "unwrapStorageType",
    ()=>unwrapStorageType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$metadata$2f$util$2f$getSiName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@polkadot/rpc-core/node_modules/@polkadot/types/metadata/util/getSiName.js [app-client] (ecmascript)");
;
function unwrapStorageSi(type) {
    return type.isPlain ? type.asPlain : type.asMap.value;
}
function unwrapStorageType(registry, type, isOptional) {
    const outputType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$polkadot$2f$rpc$2d$core$2f$node_modules$2f40$polkadot$2f$types$2f$metadata$2f$util$2f$getSiName$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSiName"])(registry.lookup, unwrapStorageSi(type));
    return isOptional ? `Option<${outputType}>` : outputType;
}
}),
]);

//# sourceMappingURL=d9b89_%40polkadot_types_db43faa3._.js.map