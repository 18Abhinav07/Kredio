(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,233525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return o}});let o=e=>{}},492975,996980,450689,e=>{"use strict";var t=e.i(675107);async function r(e,{chain:r}){let{id:o,name:n,nativeCurrency:a,rpcUrls:s,blockExplorers:i}=r;await e.request({method:"wallet_addEthereumChain",params:[{chainId:(0,t.numberToHex)(o),chainName:n,nativeCurrency:a,rpcUrls:s.default.http,blockExplorerUrls:i?Object.values(i).map(({url:e})=>e):void 0}]},{dedupe:!0,retryCount:0})}e.s(["addChain",()=>r],492975);var o=e.i(289169),n=e.i(888794);function a(e,t){let{abi:r,args:a,bytecode:s,...i}=t,l=(0,o.encodeDeployData)({abi:r,args:a,bytecode:s});return(0,n.sendTransaction)(e,{...i,...i.authorizationList?{to:null}:{},data:l})}e.s(["deployContract",()=>a],996980);var s=e.i(823838);async function i(e){return e.account?.type==="local"?[e.account.address]:(await e.request({method:"eth_accounts"},{dedupe:!0})).map(e=>(0,s.checksumAddress)(e))}e.s(["getAddresses",()=>i],450689)},509916,460841,e=>{"use strict";var t=e.i(790063),r=e.i(8406),o=e.i(450323),n=e.i(839080),a=e.i(189991),s=e.i(569934),i=e.i(383856),l=e.i(656679),c=e.i(147526),p=e.i(675107),u=e.i(10725),d=e.i(888794);let h="0x5792579257925792579257925792579257925792579257925792579257925792",m=(0,p.numberToHex)(0,{size:32});async function y(e,t){let{account:r=e.account,chain:n=e.chain,experimental_fallback:y,experimental_fallbackDelay:f=32,forceAtomic:w=!1,id:b,version:g="2.0.0"}=t,k=r?(0,a.parseAccount)(r):null,v=t.capabilities;e.dataSuffix&&!t.capabilities?.dataSuffix&&(v="string"==typeof e.dataSuffix?{...t.capabilities,dataSuffix:{value:e.dataSuffix,optional:!0}}:{...t.capabilities,dataSuffix:{value:e.dataSuffix.value,...e.dataSuffix.required?{}:{optional:!0}}});let C=t.calls.map(e=>{let t=e.abi?(0,l.encodeFunctionData)({abi:e.abi,functionName:e.functionName,args:e.args}):e.data;return{data:e.dataSuffix&&t?(0,c.concat)([t,e.dataSuffix]):t,to:e.to,value:e.value?(0,p.numberToHex)(e.value):void 0}});try{let t=await e.request({method:"wallet_sendCalls",params:[{atomicRequired:w,calls:C,capabilities:v,chainId:(0,p.numberToHex)(n.id),from:k?.address,id:b,version:g}]},{retryCount:0});if("string"==typeof t)return{id:t};return t}catch(r){if(y&&("MethodNotFoundRpcError"===r.name||"MethodNotSupportedRpcError"===r.name||"UnknownRpcError"===r.name||r.details.toLowerCase().includes("does not exist / is not available")||r.details.toLowerCase().includes("missing or invalid. request()")||r.details.toLowerCase().includes("did not match any variant of untagged enum")||r.details.toLowerCase().includes("account upgraded to unsupported contract")||r.details.toLowerCase().includes("eip-7702 not supported")||r.details.toLowerCase().includes("unsupported wc_ method")||r.details.toLowerCase().includes("feature toggled misconfigured")||r.details.toLowerCase().includes("jsonrpcengine: response has no error or result for request"))){if(v&&Object.values(v).some(e=>!e.optional)){let e="non-optional `capabilities` are not supported on fallback to `eth_sendTransaction`.";throw new i.UnsupportedNonOptionalCapabilityError(new s.BaseError(e,{details:e}))}if(w&&C.length>1){let e="`forceAtomic` is not supported on fallback to `eth_sendTransaction`.";throw new i.AtomicityNotSupportedError(new s.BaseError(e,{details:e}))}let t=[];for(let r of C){let a=(0,d.sendTransaction)(e,{account:k,chain:n,data:r.data,to:r.to,value:r.value?(0,o.hexToBigInt)(r.value):void 0});t.push(a),f>0&&await new Promise(e=>setTimeout(e,f))}let r=await Promise.allSettled(t);if(r.every(e=>"rejected"===e.status))throw r[0].reason;let a=r.map(e=>"fulfilled"===e.status?e.value:m);return{id:(0,c.concat)([...a,(0,p.numberToHex)(n.id,{size:32}),h])}}throw(0,u.getTransactionError)(r,{...t,account:k,chain:t.chain})}}async function f(e,a){let s;async function i(n){if(n.endsWith(h.slice(2))){let a=(0,r.trim)((0,t.sliceHex)(n,-64,-32)),s=(0,t.sliceHex)(n,0,-64).slice(2).match(/.{1,64}/g),i=await Promise.all(s.map(t=>m.slice(2)!==t?e.request({method:"eth_getTransactionReceipt",params:[`0x${t}`]},{dedupe:!0}):void 0)),l=i.some(e=>null===e)?100:i.every(e=>e?.status==="0x1")?200:i.every(e=>e?.status==="0x0")?500:600;return{atomic:!1,chainId:(0,o.hexToNumber)(a),receipts:i.filter(Boolean),status:l,version:"2.0.0"}}return e.request({method:"wallet_getCallsStatus",params:[n]})}let{atomic:l=!1,chainId:c,receipts:p,version:u="2.0.0",...d}=await i(a.id),[y,f]=(s=d.status)>=100&&s<200?["pending",s]:s>=200&&s<300?["success",s]:s>=300&&s<700?["failure",s]:"CONFIRMED"===s?["success",200]:"PENDING"===s?["pending",100]:[void 0,s];return{...d,atomic:l,chainId:c?(0,o.hexToNumber)(c):void 0,receipts:p?.map(e=>({...e,blockNumber:(0,o.hexToBigInt)(e.blockNumber),gasUsed:(0,o.hexToBigInt)(e.gasUsed),status:n.receiptStatuses[e.status]}))??[],statusCode:f,status:y,version:u}}e.s(["fallbackMagicIdentifier",0,h,"fallbackTransactionErrorMagicIdentifier",0,m,"sendCalls",()=>y],460841),e.s(["getCallsStatus",()=>f],509916)},477480,916207,829897,652946,288854,e=>{"use strict";var t=e.i(189991),r=e.i(675107);async function o(e,n={}){let{account:a=e.account,chainId:s}=n,i=a?(0,t.parseAccount)(a):void 0,l=s?[i?.address,[(0,r.numberToHex)(s)]]:[i?.address],c=await e.request({method:"wallet_getCapabilities",params:l}),p={};for(let[e,t]of Object.entries(c))for(let[r,o]of(p[Number(e)]={},Object.entries(t)))"addSubAccount"===r&&(r="unstable_addSubAccount"),p[Number(e)][r]=o;return"number"==typeof s?p[s]:p}async function n(e){return await e.request({method:"wallet_getPermissions"},{dedupe:!0})}e.s(["getCapabilities",()=>o],477480),e.s(["getPermissions",()=>n],916207);var a=e.i(611573),s=e.i(806685),i=e.i(467125),l=e.i(975948),c=e.i(937445);async function p(e,r){let{account:o=e.account,chainId:n,nonce:p}=r;if(!o)throw new a.AccountNotFoundError({docsPath:"/docs/eip7702/prepareAuthorization"});let u=(0,t.parseAccount)(o),d=(()=>{if(r.executor)return"self"===r.executor?r.executor:(0,t.parseAccount)(r.executor)})(),h={address:r.contractAddress??r.address,chainId:n,nonce:p};return void 0===h.chainId&&(h.chainId=e.chain?.id??await (0,i.getAction)(e,l.getChainId,"getChainId")({})),void 0===h.nonce&&(h.nonce=await (0,i.getAction)(e,c.getTransactionCount,"getTransactionCount")({address:u.address,blockTag:"pending"}),("self"===d||d?.address&&(0,s.isAddressEqual)(d.address,u.address))&&(h.nonce+=1)),h}e.s(["prepareAuthorization",()=>p],829897);var u=e.i(823838);async function d(e){return(await e.request({method:"eth_requestAccounts"},{dedupe:!0,retryCount:0})).map(e=>(0,u.getAddress)(e))}async function h(e,t){return e.request({method:"wallet_requestPermissions",params:[t]},{retryCount:0})}e.s(["requestAddresses",()=>d],652946),e.s(["requestPermissions",()=>h],288854)},403058,e=>{"use strict";var t=e.i(569934);class r extends t.BaseError{constructor(e){super(`Call bundle failed with status: ${e.statusCode}`,{name:"BundleFailedError"}),Object.defineProperty(this,"result",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.result=e}}e.s(["BundleFailedError",()=>r])},763448,e=>{"use strict";var t=e.i(569934),r=e.i(403058),o=e.i(467125),n=e.i(20101),a=e.i(976215),s=e.i(509486),i=e.i(204202),l=e.i(34888),c=e.i(509916);async function p(e,t){let p,{id:d,pollingInterval:h=e.pollingInterval,status:m=({statusCode:e})=>200===e||e>=300,retryCount:y=4,retryDelay:f=({count:e})=>200*~~(1<<e),timeout:w=6e4,throwOnFailure:b=!1}=t,g=(0,l.stringify)(["waitForCallsStatus",e.uid,d]),{promise:k,resolve:v,reject:C}=(0,s.withResolvers)(),x=(0,n.observe)(g,{resolve:v,reject:C},t=>{let n=(0,a.poll)(async()=>{let a=e=>{clearTimeout(p),n(),e(),x()};try{let n=await (0,i.withRetry)(async()=>{let t=await (0,o.getAction)(e,c.getCallsStatus,"getCallsStatus")({id:d});if(b&&"failure"===t.status)throw new r.BundleFailedError(t);return t},{retryCount:y,delay:f});if(!m(n))return;a(()=>t.resolve(n))}catch(e){a(()=>t.reject(e))}},{interval:h,emitOnBegin:!0});return n});return p=w?setTimeout(()=>{x(),clearTimeout(p),C(new u({id:d}))},w):void 0,await k}class u extends t.BaseError{constructor({id:e}){super(`Timed out while waiting for call bundle with id "${e}" to be confirmed.`,{name:"WaitForCallsStatusTimeoutError"})}}e.s(["WaitForCallsStatusTimeoutError",()=>u,"waitForCallsStatus",()=>p])},414639,599976,e=>{"use strict";var t=e.i(818249),r=e.i(975948),o=e.i(492975),n=e.i(996980),a=e.i(450689),s=e.i(509916),i=e.i(477480),l=e.i(916207),c=e.i(829897),p=e.i(368941),u=e.i(652946),d=e.i(288854),h=e.i(460841),m=e.i(467125),y=e.i(763448);async function f(e,t){let{chain:r=e.chain}=t,o=t.timeout??Math.max((r?.blockTime??0)*3,5e3),n=await (0,m.getAction)(e,h.sendCalls,"sendCalls")(t);return await (0,m.getAction)(e,y.waitForCallsStatus,"waitForCallsStatus")({...t,id:n.id,timeout:o})}var w=e.i(638291),b=e.i(738977),g=e.i(888794),k=e.i(189991),v=e.i(611573),C=e.i(569934),x=e.i(393702),W=e.i(290392),T=e.i(942305),P=e.i(147526),_=e.i(10725),I=e.i(264404),q=e.i(190521),O=e.i(976677),R=e.i(353464),A=e.i(948789);let S=new O.LruMap(128);async function j(e,t){let{account:o=e.account,assertChainId:n=!0,chain:a=e.chain,accessList:s,authorizationList:i,blobs:l,data:c,dataSuffix:u="string"==typeof e.dataSuffix?e.dataSuffix:e.dataSuffix?.value,gas:d,gasPrice:h,maxFeePerBlobGas:y,maxFeePerGas:f,maxPriorityFeePerGas:w,nonce:g,pollingInterval:O,throwOnReceiptRevert:j,type:E,value:N,...B}=t,L=t.timeout??Math.max((a?.blockTime??0)*3,5e3);if(void 0===o)throw new v.AccountNotFoundError({docsPath:"/docs/actions/wallet/sendTransactionSync"});let M=o?(0,k.parseAccount)(o):null;try{(0,R.assertRequest)(t);let o=await (async()=>t.to?t.to:null!==t.to&&i&&i.length>0?await (0,W.recoverAuthorizationAddress)({authorization:i[0]}).catch(()=>{throw new C.BaseError("`to` is required. Could not infer from `authorizationList`.")}):void 0)();if(M?.type==="json-rpc"||null===M){let t;null!==a&&(t=await (0,m.getAction)(e,r.getChainId,"getChainId")({}),n&&(0,T.assertCurrentChain)({currentChainId:t,chain:a}));let p=e.chain?.formatters?.transactionRequest?.format,b=(p||q.formatTransactionRequest)({...(0,I.extract)(B,{format:p}),accessList:s,account:M,authorizationList:i,blobs:l,chainId:t,data:c?(0,P.concat)([c,u??"0x"]):c,gas:d,gasPrice:h,maxFeePerBlobGas:y,maxFeePerGas:f,maxPriorityFeePerGas:w,nonce:g,to:o,type:E,value:N},"sendTransaction"),k=S.get(e.uid),v=k?"wallet_sendTransaction":"eth_sendTransaction",C=await (async()=>{try{return await e.request({method:v,params:[b]},{retryCount:0})}catch(t){if(!1===k)throw t;if("InvalidInputRpcError"===t.name||"InvalidParamsRpcError"===t.name||"MethodNotFoundRpcError"===t.name||"MethodNotSupportedRpcError"===t.name)return await e.request({method:"wallet_sendTransaction",params:[b]},{retryCount:0}).then(t=>(S.set(e.uid,!0),t)).catch(r=>{if("MethodNotFoundRpcError"===r.name||"MethodNotSupportedRpcError"===r.name)throw S.set(e.uid,!1),t;throw r});throw t}})(),W=await (0,m.getAction)(e,A.waitForTransactionReceipt,"waitForTransactionReceipt")({checkReplacement:!1,hash:C,pollingInterval:O,timeout:L});if(j&&"reverted"===W.status)throw new x.TransactionReceiptRevertedError({receipt:W});return W}if(M?.type==="local"){let r=await (0,m.getAction)(e,p.prepareTransactionRequest,"prepareTransactionRequest")({account:M,accessList:s,authorizationList:i,blobs:l,chain:a,data:c?(0,P.concat)([c,u??"0x"]):c,gas:d,gasPrice:h,maxFeePerBlobGas:y,maxFeePerGas:f,maxPriorityFeePerGas:w,nonce:g,nonceManager:M.nonceManager,parameters:[...p.defaultParameters,"sidecars"],type:E,value:N,...B,to:o}),n=a?.serializers?.transaction,k=await M.signTransaction(r,{serializer:n});return await (0,m.getAction)(e,b.sendRawTransactionSync,"sendRawTransactionSync")({serializedTransaction:k,throwOnReceiptRevert:j,timeout:t.timeout})}if(M?.type==="smart")throw new v.AccountTypeNotSupportedError({metaMessages:["Consider using the `sendUserOperation` Action instead."],docsPath:"/docs/actions/bundler/sendUserOperation",type:"smart"});throw new v.AccountTypeNotSupportedError({docsPath:"/docs/actions/wallet/sendTransactionSync",type:M?.type})}catch(e){if(e instanceof v.AccountTypeNotSupportedError)throw e;throw(0,_.getTransactionError)(e,{...t,account:M,chain:t.chain||void 0})}}async function E(e,t){let{id:r}=t;await e.request({method:"wallet_showCallsStatus",params:[r]})}async function N(e,t){let{account:r=e.account}=t;if(!r)throw new v.AccountNotFoundError({docsPath:"/docs/eip7702/signAuthorization"});let o=(0,k.parseAccount)(r);if(!o.signAuthorization)throw new v.AccountTypeNotSupportedError({docsPath:"/docs/eip7702/signAuthorization",metaMessages:["The `signAuthorization` Action does not support JSON-RPC Accounts."],type:o.type});let n=await (0,c.prepareAuthorization)(e,t);return o.signAuthorization(n)}var B=e.i(675107);async function L(e,{account:t=e.account,message:r}){if(!t)throw new v.AccountNotFoundError({docsPath:"/docs/actions/wallet/signMessage"});let o=(0,k.parseAccount)(t);if(o.signMessage)return o.signMessage({message:r});let n="string"==typeof r?(0,B.stringToHex)(r):r.raw instanceof Uint8Array?(0,B.toHex)(r.raw):r.raw;return e.request({method:"personal_sign",params:[n,o.address]},{retryCount:0})}async function M(e,t){let{account:o=e.account,chain:n=e.chain,...a}=t;if(!o)throw new v.AccountNotFoundError({docsPath:"/docs/actions/wallet/signTransaction"});let s=(0,k.parseAccount)(o);(0,R.assertRequest)({account:s,...t});let i=await (0,m.getAction)(e,r.getChainId,"getChainId")({});null!==n&&(0,T.assertCurrentChain)({currentChainId:i,chain:n});let l=n?.formatters||e.chain?.formatters,c=l?.transactionRequest?.format||q.formatTransactionRequest;return s.signTransaction?s.signTransaction({...a,chainId:i},{serializer:e.chain?.serializers?.transaction}):await e.request({method:"eth_signTransaction",params:[{...c({...a,account:s},"signTransaction"),chainId:(0,B.numberToHex)(i),from:s.address}]},{retryCount:0})}e.s(["signMessage",()=>L],599976);var F=e.i(643506);async function U(e,t){let{account:r=e.account,domain:o,message:n,primaryType:a}=t;if(!r)throw new v.AccountNotFoundError({docsPath:"/docs/actions/wallet/signTypedData"});let s=(0,k.parseAccount)(r),i={EIP712Domain:(0,F.getTypesForEIP712Domain)({domain:o}),...t.types};if((0,F.validateTypedData)({domain:o,message:n,primaryType:a,types:i}),s.signTypedData)return s.signTypedData({domain:o,message:n,primaryType:a,types:i});let l=(0,F.serializeTypedData)({domain:o,message:n,primaryType:a,types:i});return e.request({method:"eth_signTypedData_v4",params:[s.address,l]},{retryCount:0})}async function Q(e,{id:t}){await e.request({method:"wallet_switchEthereumChain",params:[{chainId:(0,B.numberToHex)(t)}]},{retryCount:0})}async function z(e,t){return await e.request({method:"wallet_watchAsset",params:t},{retryCount:0})}var K=e.i(938630);async function H(e,t){return K.writeContract.internal(e,j,"sendTransactionSync",t)}function D(e){return{addChain:t=>(0,o.addChain)(e,t),deployContract:t=>(0,n.deployContract)(e,t),fillTransaction:r=>(0,t.fillTransaction)(e,r),getAddresses:()=>(0,a.getAddresses)(e),getCallsStatus:t=>(0,s.getCallsStatus)(e,t),getCapabilities:t=>(0,i.getCapabilities)(e,t),getChainId:()=>(0,r.getChainId)(e),getPermissions:()=>(0,l.getPermissions)(e),prepareAuthorization:t=>(0,c.prepareAuthorization)(e,t),prepareTransactionRequest:t=>(0,p.prepareTransactionRequest)(e,t),requestAddresses:()=>(0,u.requestAddresses)(e),requestPermissions:t=>(0,d.requestPermissions)(e,t),sendCalls:t=>(0,h.sendCalls)(e,t),sendCallsSync:t=>f(e,t),sendRawTransaction:t=>(0,w.sendRawTransaction)(e,t),sendRawTransactionSync:t=>(0,b.sendRawTransactionSync)(e,t),sendTransaction:t=>(0,g.sendTransaction)(e,t),sendTransactionSync:t=>j(e,t),showCallsStatus:t=>E(e,t),signAuthorization:t=>N(e,t),signMessage:t=>L(e,t),signTransaction:t=>M(e,t),signTypedData:t=>U(e,t),switchChain:t=>Q(e,t),waitForCallsStatus:t=>(0,y.waitForCallsStatus)(e,t),watchAsset:t=>z(e,t),writeContract:t=>(0,K.writeContract)(e,t),writeContractSync:t=>H(e,t)}}e.s(["walletActions",()=>D],414639)},645037,e=>{"use strict";var t=e.i(912598),r=e.i(414639),o=e.i(44563);async function n(e,t={}){return(await (0,o.getConnectorClient)(e,t)).extend(r.walletActions)}var a=e.i(789408),s=e.i(271645),i=e.i(348396),l=e.i(170778),c=e.i(210920),p=e.i(779672);function u(e={}){let r=(0,c.useConfig)(e),o=(0,l.useChainId)({config:r}),{address:d,connector:h}=(0,p.useConnection)({config:r}),m=function(e,t={}){return{...t.query,enabled:!!(t.connector?.getProvider&&(t.query?.enabled??!0)),gcTime:0,queryFn:async r=>{if(!t.connector?.getProvider)throw Error("connector is required");let[,{connectorUid:o,scopeKey:a,...s}]=r.queryKey;return n(e,{...s,connector:t.connector})},queryKey:function(e={}){return["walletClient",(0,a.filterQueryOptions)(e)]}(t),staleTime:1/0}}(r,{...e,chainId:e.chainId??o,connector:e.connector??h,query:e.query}),y=(0,s.useRef)(d),f=(0,t.useQueryClient)();return(0,s.useEffect)(()=>{let e=y.current;!d&&e?(f.removeQueries({queryKey:m.queryKey}),y.current=void 0):d!==e&&(f.invalidateQueries({queryKey:m.queryKey}),y.current=d)},[d,f]),(0,i.useQuery)(m)}e.s(["useWalletClient",()=>u],645037)},618566,(e,t,r)=>{t.exports=e.r(976562)},604140,377349,e=>{"use strict";var t=e.i(954616),r=e.i(206148),o=e.i(191346);class n extends o.BaseError{constructor(){super("Provider not found."),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ProviderNotFoundError"})}}class a extends o.BaseError{constructor({connector:e}){super(`"${e.name}" does not support programmatic chain switching.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"SwitchChainNotSupportedError"})}}async function s(e,t){let{addEthereumChainParameter:o,chainId:n}=t,s=e.state.connections.get(t.connector?.uid??e.state.current);if(s){let e=s.connector;if(!e.switchChain)throw new a({connector:e});return await e.switchChain({addEthereumChainParameter:o,chainId:n})}let i=e.chains.find(e=>e.id===n);if(!i)throw new r.ChainNotConfiguredError;return e.setState(e=>({...e,chainId:n})),i}e.s(["ProviderNotFoundError",()=>n,"SwitchChainNotSupportedError",()=>a],377349);var i=e.i(365087);let l=[];function c(e){let t=e.chains;return(0,i.deepEqual)(l,t)?l:(l=t,t)}var p=e.i(271645),u=e.i(210920);function d(e={}){let r=(0,u.useConfig)(e),o=function(e,t={}){return{...t.mutation,mutationFn:t=>s(e,t),mutationKey:["switchChain"]}}(r,e),n=(0,t.useMutation)(o);return{...n,chains:function(e={}){let t=(0,u.useConfig)(e);return(0,p.useSyncExternalStore)(e=>(function(e,t){let{onChange:r}=t;return e._internal.chains.subscribe((e,t)=>{r(e,t)})})(t,{onChange:e}),()=>c(t),()=>c(t))}({config:r}),switchChain:n.mutate,switchChainAsync:n.mutateAsync}}e.s(["useSwitchChain",()=>d],604140)},88653,e=>{"use strict";e.i(247167);var t=e.i(843476),r=e.i(271645),o=e.i(231178),n=e.i(947414),a=e.i(674008),s=e.i(821476),i=e.i(772846),l=r,c=e.i(737806);function p(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}class u extends l.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent&&!1!==this.props.pop){let e=t.offsetParent,r=(0,i.isHTMLElement)(e)&&e.offsetWidth||0,o=(0,i.isHTMLElement)(e)&&e.offsetHeight||0,n=this.props.sizeRef.current;n.height=t.offsetHeight||0,n.width=t.offsetWidth||0,n.top=t.offsetTop,n.left=t.offsetLeft,n.right=r-n.width-n.left,n.bottom=o-n.height-n.top}return null}componentDidUpdate(){}render(){return this.props.children}}function d({children:e,isPresent:o,anchorX:n,anchorY:a,root:s,pop:i}){let d=(0,l.useId)(),h=(0,l.useRef)(null),m=(0,l.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:y}=(0,l.useContext)(c.MotionConfigContext),f=function(...e){return r.useCallback(function(...e){return t=>{let r=!1,o=e.map(e=>{let o=p(e,t);return r||"function"!=typeof o||(r=!0),o});if(r)return()=>{for(let t=0;t<o.length;t++){let r=o[t];"function"==typeof r?r():p(e[t],null)}}}}(...e),e)}(h,e.props?.ref??e?.ref);return(0,l.useInsertionEffect)(()=>{let{width:e,height:t,top:r,left:l,right:c,bottom:p}=m.current;if(o||!1===i||!h.current||!e||!t)return;let u="left"===n?`left: ${l}`:`right: ${c}`,f="bottom"===a?`bottom: ${p}`:`top: ${r}`;h.current.dataset.motionPopId=d;let w=document.createElement("style");y&&(w.nonce=y);let b=s??document.head;return b.appendChild(w),w.sheet&&w.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${u}px !important;
            ${f}px !important;
          }
        `),()=>{b.contains(w)&&b.removeChild(w)}},[o]),(0,t.jsx)(u,{isPresent:o,childRef:h,sizeRef:m,pop:i,children:!1===i?e:l.cloneElement(e,{ref:f})})}let h=({children:e,initial:o,isPresent:a,onExitComplete:i,custom:l,presenceAffectsLayout:c,mode:p,anchorX:u,anchorY:h,root:y})=>{let f=(0,n.useConstant)(m),w=(0,r.useId)(),b=!0,g=(0,r.useMemo)(()=>(b=!1,{id:w,initial:o,isPresent:a,custom:l,onExitComplete:e=>{for(let t of(f.set(e,!0),f.values()))if(!t)return;i&&i()},register:e=>(f.set(e,!1),()=>f.delete(e))}),[a,f,i]);return c&&b&&(g={...g}),(0,r.useMemo)(()=>{f.forEach((e,t)=>f.set(t,!1))},[a]),r.useEffect(()=>{a||f.size||!i||i()},[a]),e=(0,t.jsx)(d,{pop:"popLayout"===p,isPresent:a,anchorX:u,anchorY:h,root:y,children:e}),(0,t.jsx)(s.PresenceContext.Provider,{value:g,children:e})};function m(){return new Map}var y=e.i(464978);let f=e=>e.key||"";function w(e){let t=[];return r.Children.forEach(e,e=>{(0,r.isValidElement)(e)&&t.push(e)}),t}let b=({children:e,custom:s,initial:i=!0,onExitComplete:l,presenceAffectsLayout:c=!0,mode:p="sync",propagate:u=!1,anchorX:d="left",anchorY:m="top",root:b})=>{let[g,k]=(0,y.usePresence)(u),v=(0,r.useMemo)(()=>w(e),[e]),C=u&&!g?[]:v.map(f),x=(0,r.useRef)(!0),W=(0,r.useRef)(v),T=(0,n.useConstant)(()=>new Map),P=(0,r.useRef)(new Set),[_,I]=(0,r.useState)(v),[q,O]=(0,r.useState)(v);(0,a.useIsomorphicLayoutEffect)(()=>{x.current=!1,W.current=v;for(let e=0;e<q.length;e++){let t=f(q[e]);C.includes(t)?(T.delete(t),P.current.delete(t)):!0!==T.get(t)&&T.set(t,!1)}},[q,C.length,C.join("-")]);let R=[];if(v!==_){let e=[...v];for(let t=0;t<q.length;t++){let r=q[t],o=f(r);C.includes(o)||(e.splice(t,0,r),R.push(r))}return"wait"===p&&R.length&&(e=R),O(w(e)),I(v),null}let{forceRender:A}=(0,r.useContext)(o.LayoutGroupContext);return(0,t.jsx)(t.Fragment,{children:q.map(e=>{let r=f(e),o=(!u||!!g)&&(v===q||C.includes(r));return(0,t.jsx)(h,{isPresent:o,initial:(!x.current||!!i)&&void 0,custom:s,presenceAffectsLayout:c,mode:p,root:b,onExitComplete:o?void 0:()=>{if(P.current.has(r)||(P.current.add(r),!T.has(r)))return;T.set(r,!0);let e=!0;T.forEach(t=>{t||(e=!1)}),e&&(A?.(),O(W.current),u&&k?.(),l&&l())},anchorX:d,anchorY:m,children:e},r)})})};e.s(["AnimatePresence",()=>b],88653)},290571,e=>{"use strict";var t=function(e,r){return(t=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,r)};function r(e,r){if("function"!=typeof r&&null!==r)throw TypeError("Class extends value "+String(r)+" is not a constructor or null");function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}var o=function(){return(o=Object.assign||function(e){for(var t,r=1,o=arguments.length;r<o;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};function n(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&0>t.indexOf(o)&&(r[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)0>t.indexOf(o[n])&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]]);return r}function a(e,t,r,o){return new(r||(r=Promise))(function(n,a){function s(e){try{l(o.next(e))}catch(e){a(e)}}function i(e){try{l(o.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?n(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(s,i)}l((o=o.apply(e,t||[])).next())})}function s(e,t){var r,o,n,a={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]},s=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return s.next=i(0),s.throw=i(1),s.return=i(2),"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function i(i){return function(l){var c=[i,l];if(r)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(a=0)),a;)try{if(r=1,o&&(n=2&c[0]?o.return:c[0]?o.throw||((n=o.return)&&n.call(o),0):o.next)&&!(n=n.call(o,c[1])).done)return n;switch(o=0,n&&(c=[2&c[0],n.value]),c[0]){case 0:case 1:n=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,o=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!(n=(n=a.trys).length>0&&n[n.length-1])&&(6===c[0]||2===c[0])){a=0;continue}if(3===c[0]&&(!n||c[1]>n[0]&&c[1]<n[3])){a.label=c[1];break}if(6===c[0]&&a.label<n[1]){a.label=n[1],n=c;break}if(n&&a.label<n[2]){a.label=n[2],a.ops.push(c);break}n[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(e){c=[6,e],o=0}finally{r=n=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}}function i(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],o=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function l(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var o,n,a=r.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(o=a.next()).done;)s.push(o.value)}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=a.return)&&r.call(a)}finally{if(n)throw n.error}}return s}function c(e,t,r){if(r||2==arguments.length)for(var o,n=0,a=t.length;n<a;n++)!o&&n in t||(o||(o=Array.prototype.slice.call(t,0,n)),o[n]=t[n]);return e.concat(o||Array.prototype.slice.call(t))}function p(e){return this instanceof p?(this.v=e,this):new p(e)}function u(e,t,r){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var o,n=r.apply(e,t||[]),a=[];return o=Object.create(("function"==typeof AsyncIterator?AsyncIterator:Object).prototype),s("next"),s("throw"),s("return",function(e){return function(t){return Promise.resolve(t).then(e,c)}}),o[Symbol.asyncIterator]=function(){return this},o;function s(e,t){n[e]&&(o[e]=function(t){return new Promise(function(r,o){a.push([e,t,r,o])>1||i(e,t)})},t&&(o[e]=t(o[e])))}function i(e,t){try{var r;(r=n[e](t)).value instanceof p?Promise.resolve(r.value.v).then(l,c):u(a[0][2],r)}catch(e){u(a[0][3],e)}}function l(e){i("next",e)}function c(e){i("throw",e)}function u(e,t){e(t),a.shift(),a.length&&i(a[0][0],a[0][1])}}function d(e){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e=i(e),t={},o("next"),o("throw"),o("return"),t[Symbol.asyncIterator]=function(){return this},t);function o(r){t[r]=e[r]&&function(t){return new Promise(function(o,n){var a,s,i;a=o,s=n,i=(t=e[r](t)).done,Promise.resolve(t.value).then(function(e){a({value:e,done:i})},s)})}}}"function"==typeof SuppressedError&&SuppressedError,e.s(["__assign",()=>o,"__asyncGenerator",()=>u,"__asyncValues",()=>d,"__await",()=>p,"__awaiter",()=>a,"__extends",()=>r,"__generator",()=>s,"__read",()=>l,"__rest",()=>n,"__spreadArray",()=>c,"__values",()=>i])},478492,(e,t,r)=>{"use strict";var o=Object.prototype.hasOwnProperty,n="~";function a(){}function s(e,t,r){this.fn=e,this.context=t,this.once=r||!1}function i(e,t,r,o,a){if("function"!=typeof r)throw TypeError("The listener must be a function");var i=new s(r,o||e,a),l=n?n+t:t;return e._events[l]?e._events[l].fn?e._events[l]=[e._events[l],i]:e._events[l].push(i):(e._events[l]=i,e._eventsCount++),e}function l(e,t){0==--e._eventsCount?e._events=new a:delete e._events[t]}function c(){this._events=new a,this._eventsCount=0}Object.create&&(a.prototype=Object.create(null),new a().__proto__||(n=!1)),c.prototype.eventNames=function(){var e,t,r=[];if(0===this._eventsCount)return r;for(t in e=this._events)o.call(e,t)&&r.push(n?t.slice(1):t);return Object.getOwnPropertySymbols?r.concat(Object.getOwnPropertySymbols(e)):r},c.prototype.listeners=function(e){var t=n?n+e:e,r=this._events[t];if(!r)return[];if(r.fn)return[r.fn];for(var o=0,a=r.length,s=Array(a);o<a;o++)s[o]=r[o].fn;return s},c.prototype.listenerCount=function(e){var t=n?n+e:e,r=this._events[t];return r?r.fn?1:r.length:0},c.prototype.emit=function(e,t,r,o,a,s){var i=n?n+e:e;if(!this._events[i])return!1;var l,c,p=this._events[i],u=arguments.length;if(p.fn){switch(p.once&&this.removeListener(e,p.fn,void 0,!0),u){case 1:return p.fn.call(p.context),!0;case 2:return p.fn.call(p.context,t),!0;case 3:return p.fn.call(p.context,t,r),!0;case 4:return p.fn.call(p.context,t,r,o),!0;case 5:return p.fn.call(p.context,t,r,o,a),!0;case 6:return p.fn.call(p.context,t,r,o,a,s),!0}for(c=1,l=Array(u-1);c<u;c++)l[c-1]=arguments[c];p.fn.apply(p.context,l)}else{var d,h=p.length;for(c=0;c<h;c++)switch(p[c].once&&this.removeListener(e,p[c].fn,void 0,!0),u){case 1:p[c].fn.call(p[c].context);break;case 2:p[c].fn.call(p[c].context,t);break;case 3:p[c].fn.call(p[c].context,t,r);break;case 4:p[c].fn.call(p[c].context,t,r,o);break;default:if(!l)for(d=1,l=Array(u-1);d<u;d++)l[d-1]=arguments[d];p[c].fn.apply(p[c].context,l)}}return!0},c.prototype.on=function(e,t,r){return i(this,e,t,r,!1)},c.prototype.once=function(e,t,r){return i(this,e,t,r,!0)},c.prototype.removeListener=function(e,t,r,o){var a=n?n+e:e;if(!this._events[a])return this;if(!t)return l(this,a),this;var s=this._events[a];if(s.fn)s.fn!==t||o&&!s.once||r&&s.context!==r||l(this,a);else{for(var i=0,c=[],p=s.length;i<p;i++)(s[i].fn!==t||o&&!s[i].once||r&&s[i].context!==r)&&c.push(s[i]);c.length?this._events[a]=1===c.length?c[0]:c:l(this,a)}return this},c.prototype.removeAllListeners=function(e){var t;return e?(t=n?n+e:e,this._events[t]&&l(this,t)):(this._events=new a,this._eventsCount=0),this},c.prototype.off=c.prototype.removeListener,c.prototype.addListener=c.prototype.on,c.prefixed=n,c.EventEmitter=c,t.exports=c},595932,87246,e=>{"use strict";var t=e.i(478492);t.default,e.s([],595932),e.s(["EventEmitter",()=>t.default],87246)},538463,e=>{"use strict";function t(e){let t={formatters:void 0,fees:void 0,serializers:void 0,...e};return Object.assign(t,{extend:function e(t){return r=>{let o="function"==typeof r?r(t):r,n={...t,...o};return Object.assign(n,{extend:e(n)})}}(t)})}function r(){return{}}e.s(["defineChain",()=>t,"extendSchema",()=>r])},110163,588134,984534,522662,468368,e=>{"use strict";var t=e.i(95767),r=e.i(569934);class o extends r.BaseError{constructor(){super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.",{docsPath:"/docs/clients/intro",name:"UrlRequiredError"})}}e.s(["UrlRequiredError",()=>o],588134);var n=e.i(871706);function a(e,{errorInstance:t=Error("timed out"),timeout:r,signal:o}){return new Promise((n,a)=>{(async()=>{let s;try{let i=new AbortController;r>0&&(s=setTimeout(()=>{o?i.abort():a(t)},r)),n(await e({signal:i?.signal||null}))}catch(e){e?.name==="AbortError"&&a(t),a(e)}finally{clearTimeout(s)}})()})}e.s(["withTimeout",()=>a],984534);var s=e.i(34888);let i={current:0,take(){return this.current++},reset(){this.current=0}};function l(e,r={}){let{url:o,headers:n}=function(e){try{let t=new URL(e),r=(()=>{if(t.username){let e=`${decodeURIComponent(t.username)}:${decodeURIComponent(t.password)}`;return t.username="",t.password="",{url:t.toString(),headers:{Authorization:`Basic ${btoa(e)}`}}}})();return{url:t.toString(),...r}}catch{return{url:e}}}(e);return{async request(e){let{body:l,fetchFn:c=r.fetchFn??fetch,onRequest:p=r.onRequest,onResponse:u=r.onResponse,timeout:d=r.timeout??1e4}=e,h={...r.fetchOptions??{},...e.fetchOptions??{}},{headers:m,method:y,signal:f}=h;try{let e,r=await a(async({signal:e})=>{let t={...h,body:Array.isArray(l)?(0,s.stringify)(l.map(e=>({jsonrpc:"2.0",id:e.id??i.take(),...e}))):(0,s.stringify)({jsonrpc:"2.0",id:l.id??i.take(),...l}),headers:{...n,"Content-Type":"application/json",...m},method:y||"POST",signal:f||(d>0?e:null)},r=new Request(o,t),a=await p?.(r,t)??{...t,url:o};return await c(a.url??o,a)},{errorInstance:new t.TimeoutError({body:l,url:o}),timeout:d,signal:!0});if(u&&await u(r),r.headers.get("Content-Type")?.startsWith("application/json"))e=await r.json();else{e=await r.text();try{e=JSON.parse(e||"{}")}catch(t){if(r.ok)throw t;e={error:e}}}if(!r.ok)throw new t.HttpRequestError({body:l,details:(0,s.stringify)(e.error)||r.statusText,headers:r.headers,status:r.status,url:o});return e}catch(e){if(e instanceof t.HttpRequestError||e instanceof t.TimeoutError)throw e;throw new t.HttpRequestError({body:l,cause:e,url:o})}}}}e.s(["idCache",0,i],522662),e.s(["getHttpRpcClient",()=>l],468368);var c=e.i(695331);function p(e,r={}){let{batch:a,fetchFn:s,fetchOptions:i,key:u="http",methods:d,name:h="HTTP JSON-RPC",onFetchRequest:m,onFetchResponse:y,retryDelay:f,raw:w}=r;return({chain:p,retryCount:b,timeout:g})=>{let{batchSize:k=1e3,wait:v=0}="object"==typeof a?a:{},C=r.retryCount??b,x=g??r.timeout??1e4,W=e||p?.rpcUrls.default.http[0];if(!W)throw new o;let T=l(W,{fetchFn:s,fetchOptions:i,onRequest:m,onResponse:y,timeout:x});return(0,c.createTransport)({key:u,methods:d,name:h,async request({method:e,params:r}){let o={method:e,params:r},{schedule:s}=(0,n.createBatchScheduler)({id:W,wait:v,shouldSplitBatch:e=>e.length>k,fn:e=>T.request({body:e}),sort:(e,t)=>e.id-t.id}),i=async e=>a?s(e):[await T.request({body:e})],[{error:l,result:c}]=await i(o);if(w)return{error:l,result:c};if(l)throw new t.RpcRequestError({body:o,error:l,url:W});return c},retryCount:C,retryDelay:f,timeout:x,type:"http"},{fetchOptions:i,url:W})}}e.s(["http",()=>p],110163)},321960,488003,e=>{"use strict";var t=e.i(538463);let r=(0,t.defineChain)({id:1,name:"Ethereum",nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},blockTime:12e3,rpcUrls:{default:{http:["https://eth.merkle.io"]}},blockExplorers:{default:{name:"Etherscan",url:"https://etherscan.io",apiUrl:"https://api.etherscan.io/api"}},contracts:{ensUniversalResolver:{address:"0xeeeeeeee14d718c2b47d9923deab1335e144eeee",blockCreated:0x16041f6},multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:0xdb04c1}}});e.s(["mainnet",0,r],321960);let o=(0,t.defineChain)({id:0xaa36a7,name:"Sepolia",nativeCurrency:{name:"Sepolia Ether",symbol:"ETH",decimals:18},rpcUrls:{default:{http:["https://11155111.rpc.thirdweb.com"]}},blockExplorers:{default:{name:"Etherscan",url:"https://sepolia.etherscan.io",apiUrl:"https://api-sepolia.etherscan.io/api"}},contracts:{multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:751532},ensUniversalResolver:{address:"0xeeeeeeee14d718c2b47d9923deab1335e144eeee",blockCreated:8928790}},testnet:!0});e.s(["sepolia",0,o],488003)},755263,e=>{"use strict";var t=`{
  "connect_wallet": {
    "label": "Connect Wallet",
    "wrong_network": {
      "label": "Wrong network"
    }
  },

  "intro": {
    "title": "What is a Wallet?",
    "description": "A wallet is used to send, receive, store, and display digital assets. It's also a new way to log in, without needing to create new accounts and passwords on every website.",
    "digital_asset": {
      "title": "A Home for your Digital Assets",
      "description": "Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs."
    },
    "login": {
      "title": "A New Way to Log In",
      "description": "Instead of creating new accounts and passwords on every website, just connect your wallet."
    },
    "get": {
      "label": "Get a Wallet"
    },
    "learn_more": {
      "label": "Learn More"
    }
  },

  "sign_in": {
    "label": "Verify your account",
    "description": "To finish connecting, you must sign a message in your wallet to verify that you are the owner of this account.",
    "message": {
      "send": "Sign message",
      "preparing": "Preparing message...",
      "cancel": "Cancel",
      "preparing_error": "Error preparing message, please retry!"
    },
    "signature": {
      "waiting": "Waiting for signature...",
      "verifying": "Verifying signature...",
      "signing_error": "Error signing message, please retry!",
      "verifying_error": "Error verifying signature, please retry!",
      "oops_error": "Oops, something went wrong!"
    }
  },

  "connect": {
    "label": "Connect",
    "title": "Connect a Wallet",
    "new_to_ethereum": {
      "description": "New to Ethereum wallets?",
      "learn_more": {
        "label": "Learn More"
      }
    },
    "learn_more": {
      "label": "Learn more"
    },
    "recent": "Recent",
    "status": {
      "opening": "Opening %{wallet}...",
      "connecting": "Connecting",
      "connect_mobile": "Continue in %{wallet}",
      "not_installed": "%{wallet} is not installed",
      "not_available": "%{wallet} is not available",
      "confirm": "Confirm connection in the extension",
      "confirm_mobile": "Accept connection request in the wallet"
    },
    "secondary_action": {
      "get": {
        "description": "Don't have %{wallet}?",
        "label": "GET"
      },
      "install": {
        "label": "INSTALL"
      },
      "retry": {
        "label": "RETRY"
      }
    },
    "walletconnect": {
      "description": {
        "full": "Need the official WalletConnect modal?",
        "compact": "Need the WalletConnect modal?"
      },
      "open": {
        "label": "OPEN"
      }
    }
  },

  "connect_scan": {
    "title": "Scan with %{wallet}",
    "fallback_title": "Scan with your phone"
  },

  "connector_group": {
    "installed": "Installed",
    "recommended": "Recommended",
    "other": "Other",
    "popular": "Popular",
    "more": "More",
    "others": "Others"
  },

  "get": {
    "title": "Get a Wallet",
    "action": {
      "label": "GET"
    },
    "mobile": {
      "description": "Mobile Wallet"
    },
    "extension": {
      "description": "Browser Extension"
    },
    "mobile_and_extension": {
      "description": "Mobile Wallet and Extension"
    },
    "mobile_and_desktop": {
      "description": "Mobile and Desktop Wallet"
    },
    "looking_for": {
      "title": "Not what you're looking for?",
      "mobile": {
        "description": "Select a wallet on the main screen to get started with a different wallet provider."
      },
      "desktop": {
        "compact_description": "Select a wallet on the main screen to get started with a different wallet provider.",
        "wide_description": "Select a wallet on the left to get started with a different wallet provider."
      }
    }
  },

  "get_options": {
    "title": "Get started with %{wallet}",
    "short_title": "Get %{wallet}",
    "mobile": {
      "title": "%{wallet} for Mobile",
      "description": "Use the mobile wallet to explore the world of Ethereum.",
      "download": {
        "label": "Get the app"
      }
    },
    "extension": {
      "title": "%{wallet} for %{browser}",
      "description": "Access your wallet right from your favorite web browser.",
      "download": {
        "label": "Add to %{browser}"
      }
    },
    "desktop": {
      "title": "%{wallet} for %{platform}",
      "description": "Access your wallet natively from your powerful desktop.",
      "download": {
        "label": "Add to %{platform}"
      }
    }
  },

  "get_mobile": {
    "title": "Install %{wallet}",
    "description": "Scan with your phone to download on iOS or Android",
    "continue": {
      "label": "Continue"
    }
  },

  "get_instructions": {
    "mobile": {
      "connect": {
        "label": "Connect"
      },
      "learn_more": {
        "label": "Learn More"
      }
    },
    "extension": {
      "refresh": {
        "label": "Refresh"
      },
      "learn_more": {
        "label": "Learn More"
      }
    },
    "desktop": {
      "connect": {
        "label": "Connect"
      },
      "learn_more": {
        "label": "Learn More"
      }
    }
  },

  "chains": {
    "title": "Switch Networks",
    "wrong_network": "Wrong network detected, switch or disconnect to continue.",
    "confirm": "Confirm in Wallet",
    "switching_not_supported": "Your wallet does not support switching networks from %{appName}. Try switching networks from within your wallet instead.",
    "switching_not_supported_fallback": "Your wallet does not support switching networks from this app. Try switching networks from within your wallet instead.",
    "disconnect": "Disconnect",
    "connected": "Connected"
  },

  "profile": {
    "disconnect": {
      "label": "Disconnect"
    },
    "copy_address": {
      "label": "Copy Address",
      "copied": "Copied!"
    },
    "explorer": {
      "label": "View more on explorer"
    },
    "transactions": {
      "description": "%{appName} transactions will appear here...",
      "description_fallback": "Your transactions will appear here...",
      "recent": {
        "title": "Recent Transactions"
      },
      "clear": {
        "label": "Clear All"
      }
    }
  },

  "wallet_connectors": {
    "ready": {
      "qr_code": {
        "step1": {
          "description": "Add Ready to your home screen for faster access to your wallet.",
          "title": "Open the Ready app"
        },
        "step2": {
          "description": "Create a wallet and username, or import an existing wallet.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "berasig": {
      "extension": {
        "step1": {
          "title": "Install the BeraSig extension",
          "description": "We recommend pinning BeraSig to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "best": {
      "qr_code": {
        "step1": {
          "title": "Open the Best Wallet app",
          "description": "Add Best Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "bifrost": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bifrost Wallet on your home screen for quicker access.",
          "title": "Open the Bifrost Wallet app"
        },
        "step2": {
          "description": "Create or import a wallet using your recovery phrase.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "bitget": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bitget Wallet on your home screen for quicker access.",
          "title": "Open the Bitget Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Bitget Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Bitget Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "bitski": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Bitski to your taskbar for quicker access to your wallet.",
          "title": "Install the Bitski extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "bitverse": {
      "qr_code": {
        "step1": {
          "title": "Open the Bitverse Wallet app",
          "description": "Add Bitverse Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "bloom": {
      "desktop": {
        "step1": {
          "title": "Open the Bloom Wallet app",
          "description": "We recommend putting Bloom Wallet on your home screen for quicker access."
        },
        "step2": {
          "description": "Create or import a wallet using your recovery phrase.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you have a wallet, click on Connect to connect via Bloom. A connection prompt in the app will appear for you to confirm the connection.",
          "title": "Click on Connect"
        }
      }
    },

    "bybit": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bybit on your home screen for faster access to your wallet.",
          "title": "Open the Bybit app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "Click at the top right of your browser and pin Bybit Wallet for easy access.",
          "title": "Install the Bybit Wallet extension"
        },
        "step2": {
          "description": "Create a new wallet or import an existing one.",
          "title": "Create or Import a wallet"
        },
        "step3": {
          "description": "Once you set up Bybit Wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "binance": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Binance on your home screen for faster access to your wallet.",
          "title": "Open the Binance app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Binance Wallet extension",
          "description": "We recommend pinning Binance Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "coin98": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Coin98 Wallet on your home screen for faster access to your wallet.",
          "title": "Open the Coin98 Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },

      "extension": {
        "step1": {
          "description": "Click at the top right of your browser and pin Coin98 Wallet for easy access.",
          "title": "Install the Coin98 Wallet extension"
        },
        "step2": {
          "description": "Create a new wallet or import an existing one.",
          "title": "Create or Import a wallet"
        },
        "step3": {
          "description": "Once you set up Coin98 Wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "coinbase": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Coinbase Wallet on your home screen for quicker access.",
          "title": "Open the Coinbase Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using the cloud backup feature.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Coinbase Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Coinbase Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "compass": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Compass Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Compass Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "core": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Core on your home screen for faster access to your wallet.",
          "title": "Open the Core app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Core to your taskbar for quicker access to your wallet.",
          "title": "Install the Core extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "fox": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting FoxWallet on your home screen for quicker access.",
          "title": "Open the FoxWallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "frontier": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Frontier Wallet on your home screen for quicker access.",
          "title": "Open the Frontier Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Frontier Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Frontier Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "im_token": {
      "qr_code": {
        "step1": {
          "title": "Open the imToken app",
          "description": "Put imToken app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "iopay": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting ioPay on your home screen for faster access to your wallet.",
          "title": "Open the ioPay app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      }
    },

    "kaikas": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Kaikas to your taskbar for quicker access to your wallet.",
          "title": "Install the Kaikas extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Kaikas app",
          "description": "Put Kaikas app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "kaia": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Kaia to your taskbar for quicker access to your wallet.",
          "title": "Install the Kaia extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Kaia app",
          "description": "Put Kaia app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "kraken": {
      "qr_code": {
        "step1": {
          "title": "Open the Kraken Wallet app",
          "description": "Add Kraken Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "kresus": {
      "qr_code": {
        "step1": {
          "title": "Open the Kresus Wallet app",
          "description": "Add Kresus Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "magicEden": {
      "extension": {
        "step1": {
          "title": "Install the Magic Eden extension",
          "description": "We recommend pinning Magic Eden to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "metamask": {
      "qr_code": {
        "step1": {
          "title": "Open the MetaMask app",
          "description": "We recommend putting MetaMask on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the MetaMask extension",
          "description": "We recommend pinning MetaMask to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "nestwallet": {
      "extension": {
        "step1": {
          "title": "Install the NestWallet extension",
          "description": "We recommend pinning NestWallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "okx": {
      "qr_code": {
        "step1": {
          "title": "Open the OKX Wallet app",
          "description": "We recommend putting OKX Wallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the OKX Wallet extension",
          "description": "We recommend pinning OKX Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "omni": {
      "qr_code": {
        "step1": {
          "title": "Open the Omni app",
          "description": "Add Omni to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your home screen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "1inch": {
      "qr_code": {
        "step1": {
          "description": "Put 1inch Wallet on your home screen for faster access to your wallet.",
          "title": "Open the 1inch Wallet app"
        },
        "step2": {
          "description": "Create a wallet and username, or import an existing wallet.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "token_pocket": {
      "qr_code": {
        "step1": {
          "title": "Open the TokenPocket app",
          "description": "We recommend putting TokenPocket on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the TokenPocket extension",
          "description": "We recommend pinning TokenPocket to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "trust": {
      "qr_code": {
        "step1": {
          "title": "Open the Trust Wallet app",
          "description": "Put Trust Wallet on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the Trust Wallet extension",
          "description": "Click at the top right of your browser and pin Trust Wallet for easy access."
        },
        "step2": {
          "title": "Create or Import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up Trust Wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "uniswap": {
      "qr_code": {
        "step1": {
          "title": "Open the Uniswap app",
          "description": "Add Uniswap Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "zerion": {
      "qr_code": {
        "step1": {
          "title": "Open the Zerion app",
          "description": "We recommend putting Zerion on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the Zerion extension",
          "description": "We recommend pinning Zerion to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "rainbow": {
      "qr_code": {
        "step1": {
          "title": "Open the Rainbow app",
          "description": "We recommend putting Rainbow on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "You can easily backup your wallet using our backup feature on your phone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "enkrypt": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Enkrypt Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Enkrypt Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "frame": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Frame to your taskbar for quicker access to your wallet.",
          "title": "Install Frame & the companion extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "one_key": {
      "extension": {
        "step1": {
          "title": "Install the OneKey Wallet extension",
          "description": "We recommend pinning OneKey Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "paraswap": {
      "qr_code": {
        "step1": {
          "title": "Open the ParaSwap app",
          "description": "Add ParaSwap Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "phantom": {
      "extension": {
        "step1": {
          "title": "Install the Phantom extension",
          "description": "We recommend pinning Phantom to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "rabby": {
      "extension": {
        "step1": {
          "title": "Install the Rabby extension",
          "description": "We recommend pinning Rabby to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "ronin": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Ronin Wallet on your home screen for quicker access.",
          "title": "Open the Ronin Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Ronin Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Ronin Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "ramper": {
      "extension": {
        "step1": {
          "title": "Install the Ramper extension",
          "description": "We recommend pinning Ramper to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "safeheron": {
      "extension": {
        "step1": {
          "title": "Install the Core extension",
          "description": "We recommend pinning Safeheron to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "taho": {
      "extension": {
        "step1": {
          "title": "Install the Taho extension",
          "description": "We recommend pinning Taho to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "wigwam": {
      "extension": {
        "step1": {
          "title": "Install the Wigwam extension",
          "description": "We recommend pinning Wigwam to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "talisman": {
      "extension": {
        "step1": {
          "title": "Install the Talisman extension",
          "description": "We recommend pinning Talisman to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import an Ethereum Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "ctrl": {
      "extension": {
        "step1": {
          "title": "Install the CTRL Wallet extension",
          "description": "We recommend pinning CTRL Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "zeal": {
      "qr_code": {
        "step1": {
          "title": "Open the Zeal app",
          "description": "Add Zeal Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Zeal extension",
          "description": "We recommend pinning Zeal to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "safepal": {
      "extension": {
        "step1": {
          "title": "Install the SafePal Wallet extension",
          "description": "Click at the top right of your browser and pin SafePal Wallet for easy access."
        },
        "step2": {
          "title": "Create or Import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up SafePal Wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the SafePal Wallet app",
          "description": "Put SafePal Wallet on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "desig": {
      "extension": {
        "step1": {
          "title": "Install the Desig extension",
          "description": "We recommend pinning Desig to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "subwallet": {
      "extension": {
        "step1": {
          "title": "Install the SubWallet extension",
          "description": "We recommend pinning SubWallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the SubWallet app",
          "description": "We recommend putting SubWallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "clv": {
      "extension": {
        "step1": {
          "title": "Install the CLV Wallet extension",
          "description": "We recommend pinning CLV Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the CLV Wallet app",
          "description": "We recommend putting CLV Wallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "okto": {
      "qr_code": {
        "step1": {
          "title": "Open the Okto app",
          "description": "Add Okto to your home screen for quick access"
        },
        "step2": {
          "title": "Create an MPC Wallet",
          "description": "Create an account and generate a wallet"
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Tap the Scan QR icon at the top right and confirm the prompt to connect."
        }
      }
    },

    "ledger": {
      "desktop": {
        "step1": {
          "title": "Open the Ledger Live app",
          "description": "We recommend putting Ledger Live on your home screen for quicker access."
        },
        "step2": {
          "title": "Set up your Ledger",
          "description": "Set up a new Ledger or connect to an existing one."
        },
        "step3": {
          "title": "Connect",
          "description": "A connection prompt will appear for you to connect your wallet."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Ledger Live app",
          "description": "We recommend putting Ledger Live on your home screen for quicker access."
        },
        "step2": {
          "title": "Set up your Ledger",
          "description": "You can either sync with the desktop app or connect your Ledger."
        },
        "step3": {
          "title": "Scan the code",
          "description": "Tap WalletConnect then Switch to Scanner. After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "valora": {
      "qr_code": {
        "step1": {
          "title": "Open the Valora app",
          "description": "We recommend putting Valora on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "gate": {
      "qr_code": {
        "step1": {
          "title": "Open the Gate app",
          "description": "We recommend putting Gate on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Gate extension",
          "description": "We recommend pinning Gate to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "gemini": {
      "qr_code": {
        "step1": {
          "title": "Open keys.gemini.com",
          "description": "Visit keys.gemini.com on your mobile browser - no app download required."
        },
        "step2": {
          "title": "Create Your Wallet Instantly",
          "description": "Set up your smart wallet in seconds using your device's built-in authentication."
        },
        "step3": {
          "title": "Scan to Connect",
          "description": "Scan the QR code to instantly connect your wallet - it just works."
        }
      },
      "extension": {
        "step1": {
          "title": "Go to keys.gemini.com",
          "description": "No extensions or downloads needed - your wallet lives securely in the browser."
        },
        "step2": {
          "title": "One-Click Setup",
          "description": "Create your smart wallet instantly with passkey authentication - easier than any wallet out there."
        },
        "step3": {
          "title": "Connect and Go",
          "description": "Approve the connection and you're ready - the unopinionated wallet that just works."
        }
      }
    },

    "xportal": {
      "qr_code": {
        "step1": {
          "description": "Put xPortal on your home screen for faster access to your wallet.",
          "title": "Open the xPortal app"
        },
        "step2": {
          "description": "Create a wallet or import an existing one.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "mew": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting MEW Wallet on your home screen for quicker access.",
          "title": "Open the MEW Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using the cloud backup feature.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "zilpay": {
      "qr_code": {
        "step1": {
          "title": "Open the ZilPay app",
          "description": "Add ZilPay to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "nova": {
      "qr_code": {
        "step1": {
          "title": "Open the Nova Wallet app",
          "description": "Add Nova Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    }
  }
}
`;e.s(["en_US_default",()=>t])},101139,e=>{e.v(t=>Promise.all(["static/chunks/27dbc00797f28d21.js"].map(t=>e.l(t))).then(()=>t(109963)))},625932,e=>{e.v(e=>Promise.resolve().then(()=>e(776267)))},470308,e=>{e.v(t=>Promise.all(["static/chunks/193c3b1a7932bf59.js"].map(t=>e.l(t))).then(()=>t(915618)))},114544,e=>{e.v(t=>Promise.all(["static/chunks/e0ed2649d3073a5e.js"].map(t=>e.l(t))).then(()=>t(64871)))},199160,e=>{e.v(t=>Promise.all(["static/chunks/c06b74b32486f252.js"].map(t=>e.l(t))).then(()=>t(552117)))},458488,e=>{e.v(t=>Promise.all(["static/chunks/513a70a9a6655f97.js"].map(t=>e.l(t))).then(()=>t(516601)))},945205,e=>{e.v(t=>Promise.all(["static/chunks/0bcbb46c5e3fdf25.js"].map(t=>e.l(t))).then(()=>t(216419)))},669023,e=>{e.v(t=>Promise.all(["static/chunks/f127eddbd265565e.js"].map(t=>e.l(t))).then(()=>t(739776)))},469689,e=>{e.v(t=>Promise.all(["static/chunks/864147b80873992f.js"].map(t=>e.l(t))).then(()=>t(356290)))},760813,e=>{e.v(t=>Promise.all(["static/chunks/1b12645ee8bc884b.js"].map(t=>e.l(t))).then(()=>t(252306)))},423705,e=>{e.v(t=>Promise.all(["static/chunks/a75d878f4f5f13a9.js"].map(t=>e.l(t))).then(()=>t(997708)))},736057,e=>{e.v(t=>Promise.all(["static/chunks/f5c6a72a7b227ff8.js"].map(t=>e.l(t))).then(()=>t(905405)))},917507,e=>{e.v(t=>Promise.all(["static/chunks/6323be2ba253054e.js"].map(t=>e.l(t))).then(()=>t(70881)))},82058,e=>{e.v(t=>Promise.all(["static/chunks/eb6ec9225ab8f4a4.js"].map(t=>e.l(t))).then(()=>t(945467)))},984221,e=>{e.v(t=>Promise.all(["static/chunks/e735df406043c439.js"].map(t=>e.l(t))).then(()=>t(657990)))},281312,e=>{e.v(t=>Promise.all(["static/chunks/a53900a82d8881ce.js"].map(t=>e.l(t))).then(()=>t(737224)))},581928,e=>{e.v(t=>Promise.all(["static/chunks/58f6b85793db030f.js"].map(t=>e.l(t))).then(()=>t(887256)))},784600,e=>{e.v(t=>Promise.all(["static/chunks/50482d5029b0c1eb.js"].map(t=>e.l(t))).then(()=>t(220519)))},290491,e=>{e.v(t=>Promise.all(["static/chunks/83a55f541159f125.js"].map(t=>e.l(t))).then(()=>t(162088)))},435239,e=>{e.v(t=>Promise.all(["static/chunks/f8ea650a7506bc8d.js"].map(t=>e.l(t))).then(()=>t(771650)))},917421,e=>{e.v(t=>Promise.all(["static/chunks/a09a24d366d50595.js"].map(t=>e.l(t))).then(()=>t(157677)))},391110,e=>{e.v(t=>Promise.all(["static/chunks/28abe5bdf71d034d.js"].map(t=>e.l(t))).then(()=>t(210006)))},442086,e=>{e.v(t=>Promise.all(["static/chunks/cdf4d277428d3411.js"].map(t=>e.l(t))).then(()=>t(67881)))},105872,e=>{e.v(t=>Promise.all(["static/chunks/fd55b5c44095d849.js"].map(t=>e.l(t))).then(()=>t(864976)))},271711,e=>{e.v(t=>Promise.all(["static/chunks/f20a5acf8b08ad4d.js"].map(t=>e.l(t))).then(()=>t(29311)))},567031,e=>{e.v(t=>Promise.all(["static/chunks/1d23d7bb99a3c6fd.js"].map(t=>e.l(t))).then(()=>t(75789)))},575685,e=>{e.v(t=>Promise.all(["static/chunks/e625a34073f9e963.js"].map(t=>e.l(t))).then(()=>t(786882)))},604414,e=>{e.v(t=>Promise.all(["static/chunks/1fbab4c19bf07056.js"].map(t=>e.l(t))).then(()=>t(352164)))},777210,e=>{e.v(t=>Promise.all(["static/chunks/bb7631c2e765bae5.js"].map(t=>e.l(t))).then(()=>t(745141)))},230454,e=>{e.v(t=>Promise.all(["static/chunks/febaee82fe46dd12.js"].map(t=>e.l(t))).then(()=>t(516267)))},80911,e=>{e.v(t=>Promise.all(["static/chunks/31312a55a741195b.js"].map(t=>e.l(t))).then(()=>t(138783)))},197615,e=>{e.v(t=>Promise.all(["static/chunks/000d5aaae1649753.js"].map(t=>e.l(t))).then(()=>t(540804)))},485284,e=>{e.v(t=>Promise.all(["static/chunks/3f89b7b695a6d7dc.js"].map(t=>e.l(t))).then(()=>t(303962)))},346977,e=>{e.v(t=>Promise.all(["static/chunks/98f04ecab8ba803d.js"].map(t=>e.l(t))).then(()=>t(370564)))},736033,e=>{e.v(t=>Promise.all(["static/chunks/07353aebad6bc3dc.js"].map(t=>e.l(t))).then(()=>t(472299)))},557289,e=>{e.v(t=>Promise.all(["static/chunks/12dab76068ded989.js"].map(t=>e.l(t))).then(()=>t(920685)))},649149,e=>{e.v(t=>Promise.all(["static/chunks/9b3f225083ef0a3d.js"].map(t=>e.l(t))).then(()=>t(418891)))},9974,e=>{e.v(t=>Promise.all(["static/chunks/bf12f4c1f32f80d6.js"].map(t=>e.l(t))).then(()=>t(761011)))},485155,e=>{e.v(t=>Promise.all(["static/chunks/0c91bd755a4f9dab.js"].map(t=>e.l(t))).then(()=>t(421618)))},759968,e=>{e.v(t=>Promise.all(["static/chunks/a197228ba3c59a4c.js"].map(t=>e.l(t))).then(()=>t(251012)))},38898,e=>{e.v(t=>Promise.all(["static/chunks/87d8b1e64f99f9aa.js"].map(t=>e.l(t))).then(()=>t(900368)))},822574,e=>{e.v(t=>Promise.all(["static/chunks/b8670320de73bd6e.js"].map(t=>e.l(t))).then(()=>t(248530)))},101716,e=>{e.v(t=>Promise.all(["static/chunks/0763922dc86777d7.js"].map(t=>e.l(t))).then(()=>t(839444)))},24530,e=>{e.v(t=>Promise.all(["static/chunks/6ccf8e284ca75052.js"].map(t=>e.l(t))).then(()=>t(723557)))},768769,e=>{e.v(t=>Promise.all(["static/chunks/f855adf781fbabb6.js"].map(t=>e.l(t))).then(()=>t(880804)))},667285,e=>{e.v(t=>Promise.all(["static/chunks/5e52b85b2272e504.js"].map(t=>e.l(t))).then(()=>t(804453)))},193126,e=>{e.v(t=>Promise.all(["static/chunks/d4398ab35b431f0d.js"].map(t=>e.l(t))).then(()=>t(973024)))},708036,e=>{e.v(t=>Promise.all(["static/chunks/102c06659c7540e5.js"].map(t=>e.l(t))).then(()=>t(481675)))},811338,e=>{e.v(t=>Promise.all(["static/chunks/d7d3a2be52dabc28.js"].map(t=>e.l(t))).then(()=>t(385710)))},321625,e=>{e.v(t=>Promise.all(["static/chunks/9c0b5f5ffab2a5bb.js"].map(t=>e.l(t))).then(()=>t(656395)))},345304,e=>{e.v(t=>Promise.all(["static/chunks/3ada4ad80b724a17.js"].map(t=>e.l(t))).then(()=>t(382042)))},738278,e=>{e.v(t=>Promise.all(["static/chunks/5894511f7316295f.js"].map(t=>e.l(t))).then(()=>t(619124)))},792872,e=>{e.v(t=>Promise.all(["static/chunks/e5d550b9732ab661.js"].map(t=>e.l(t))).then(()=>t(371659)))},226755,e=>{e.v(t=>Promise.all(["static/chunks/3f039b77c6180d48.js"].map(t=>e.l(t))).then(()=>t(446495)))},504937,e=>{e.v(t=>Promise.all(["static/chunks/e74d6a3a94fc6c26.js"].map(t=>e.l(t))).then(()=>t(156255)))},410758,e=>{e.v(t=>Promise.all(["static/chunks/b7eedf15854f081e.js"].map(t=>e.l(t))).then(()=>t(908254)))},886422,e=>{e.v(t=>Promise.all(["static/chunks/383937fef5e1ddb5.js"].map(t=>e.l(t))).then(()=>t(652860)))},274604,e=>{e.v(t=>Promise.all(["static/chunks/a8aa6ff78e82658e.js"].map(t=>e.l(t))).then(()=>t(505209)))},426975,e=>{e.v(t=>Promise.all(["static/chunks/6d71cfc1f7683d60.js"].map(t=>e.l(t))).then(()=>t(6938)))},106369,e=>{e.v(t=>Promise.all(["static/chunks/dce3f3842db52dbe.js"].map(t=>e.l(t))).then(()=>t(358134)))},507518,e=>{e.v(t=>Promise.all(["static/chunks/528cda09397ca281.js"].map(t=>e.l(t))).then(()=>t(221274)))},396057,e=>{e.v(t=>Promise.all(["static/chunks/a0342869754663ac.js"].map(t=>e.l(t))).then(()=>t(432867)))},192150,e=>{e.v(t=>Promise.all(["static/chunks/04f0d42768e79133.js"].map(t=>e.l(t))).then(()=>t(42941)))},703354,e=>{e.v(t=>Promise.all(["static/chunks/ce5d6995e254e19e.js"].map(t=>e.l(t))).then(()=>t(185157)))},422316,e=>{e.v(t=>Promise.all(["static/chunks/e9abab00795bfca8.js"].map(t=>e.l(t))).then(()=>t(460012)))},932219,e=>{e.v(t=>Promise.all(["static/chunks/3f8afd6e6837c4b6.js"].map(t=>e.l(t))).then(()=>t(467138)))},437039,e=>{e.v(t=>Promise.all(["static/chunks/17727e254efd0ba9.js"].map(t=>e.l(t))).then(()=>t(21043)))},31273,e=>{e.v(t=>Promise.all(["static/chunks/604c018433c5d66d.js"].map(t=>e.l(t))).then(()=>t(444733)))},812921,e=>{e.v(t=>Promise.all(["static/chunks/ba246cf12e0a4cd0.js"].map(t=>e.l(t))).then(()=>t(327052)))},93305,e=>{e.v(t=>Promise.all(["static/chunks/27282591893e9efa.js"].map(t=>e.l(t))).then(()=>t(823233)))},65212,e=>{e.v(t=>Promise.all(["static/chunks/aa612cb4451d0ce2.js"].map(t=>e.l(t))).then(()=>t(879917)))},961315,e=>{e.v(t=>Promise.all(["static/chunks/b45bf4586b657794.js"].map(t=>e.l(t))).then(()=>t(4245)))},588300,e=>{e.v(t=>Promise.all(["static/chunks/280b3e1534b10084.js"].map(t=>e.l(t))).then(()=>t(227574)))},782184,e=>{e.v(t=>Promise.all(["static/chunks/cb9c522bf9d1dc24.js"].map(t=>e.l(t))).then(()=>t(956007)))},20651,e=>{e.v(t=>Promise.all(["static/chunks/88be83e3fde7daca.js"].map(t=>e.l(t))).then(()=>t(150676)))},254566,e=>{e.v(t=>Promise.all(["static/chunks/8fdd0d89755b8508.js"].map(t=>e.l(t))).then(()=>t(164540)))},873830,e=>{e.v(t=>Promise.all(["static/chunks/7bd87e064f4afcf8.js"].map(t=>e.l(t))).then(()=>t(631690)))},554610,e=>{e.v(t=>Promise.all(["static/chunks/ba77a1136b640f8a.js"].map(t=>e.l(t))).then(()=>t(93227)))}]);