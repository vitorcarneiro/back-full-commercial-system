import { decode } from "js-base64";
import { parseString } from "xml2js";

export function registerInvoiceByXml(xmlBase64: string) {
  const xml = decode(xmlBase64);
  let xmlJson: Object;
  parseString(xml, (_err: any, result: any) => {
    xmlJson = result;
  });

  return mapInvoiceJson(xmlJson);
}

function mapInvoiceJson(invoice: any) {
  return {
    accessKey: invoice.nfeProc.NFe[0].infNFe[0].$.Id.replace("NFe", ""),
    // stateCode: 0,
    // checkCode: 0,
    operationNature: invoice.nfeProc.NFe[0].infNFe[0].ide[0].natOp[0],
    // paymentType: "inCash",
    // codeModel: 0,
    serie: invoice.nfeProc.NFe[0].infNFe[0].ide[0].serie[0],
    number: invoice.nfeProc.NFe[0].infNFe[0].ide[0].nNF[0],
    issuedOn: invoice.nfeProc.NFe[0].infNFe[0].ide[0].dhEmi[0],
    // operationOn: "2022-05-20T01:35:53.658Z",
    // operationType: "incoming",
    // destination: "international_Operation",
    // cityCode: 0,
    // printType: "none",
    // issueType: "cONTINGENCIA_OFF_LINE_NFC_E",
    // checkCodeDigit: 0,
    // environmentType: "production",
    // purposeType: "devolution",
    // consumerType: "normal",
    // presenceType: "none",
    // processType: "ownSoftware",
    // invoiceVersion: "string",
    xmlVersion: invoice.nfeProc.NFe[0].infNFe[0].$.versao,
    // contingencyOn: "2022-05-20T01:35:53.658Z",
    // contingencyJustification: "string",
    issuer: {
      cnpj: invoice.nfeProc.NFe[0].infNFe[0].emit[0].CNPJ[0],
      name: invoice.nfeProc.NFe[0].infNFe[0].emit[0].xNome[0],
      // tradeName: "string",
      phone: invoice.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].fone[0],
      address: {
        postalCode:
          invoice.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].CEP[0],
        state: invoice.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].UF[0],
        city: {
          code: invoice.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].cMun[0],
          name: invoice.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].xMun[0],
        },
        district:
          invoice.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].xBairro[0],
        additionalInformation:
          invoice.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].xMun[0],
        street: invoice.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].xLgr[0],
        number: invoice.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].nro[0],
        country: invoice.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].xPais[0],
      },
      stateTaxNumber: invoice.nfeProc.NFe[0].infNFe[0].emit[0].IE[0],
      codeTaxRegime: invoice.nfeProc.NFe[0].infNFe[0].emit[0].CRT[0],
      //   cnae: 0,
      //   im: "string",
      //   iest: 0,
      //   type: "undefined",
    },
    buyer: {
      cnpj: invoice.nfeProc.NFe[0].infNFe[0].dest[0].CNPJ[0],
      name: invoice.nfeProc.NFe[0].infNFe[0].dest[0].xNome[0],
      phone: invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].fone[0],
      address: {
        postalCode:
          invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].CEP[0],
        state: invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].UF[0],
        city: {
          code: invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].cMun[0],
          name: invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xMun[0],
        },
        district:
          invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xBairro[0],
        //     additionalInformation: invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xNome[0],
        //     streetSuffix: invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xNome[0],
        street: invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xLgr[0],
        number: invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].nro[0],
        country: invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xPais[0],
      },
      stateTaxNumber: invoice.nfeProc.NFe[0].infNFe[0].dest[0].IE[0],
      stateTaxNumberIndicator:
        invoice.nfeProc.NFe[0].infNFe[0].dest[0].indIEDest[0],
      //   email: invoice.nfeProc.NFe[0].infNFe[0].dest[0].xNome[0],
      //   type: "undefined",
    },
    totals: {
      icms: {
        baseTax: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vBC[0]
        ),
        icmsAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vICMS[0]
        ),
        icmsExemptAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vICMSDeson[0]
        ),
        stCalculationBasisAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vBCST[0]
        ),
        stAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vST[0]
        ),
        productAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vProd[0]
        ),
        freightAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vFrete[0]
        ),
        insuranceAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vSeg[0]
        ),
        discountAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vDesc[0]
        ),
        iiAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vII[0]
        ),
        ipiAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vIPI[0]
        ),
        pisAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vPIS[0]
        ),
        cofinsAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vCOFINS[0]
        ),
        othersAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vOutro[0]
        ),
        invoiceAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vNF[0]
        ),
        // fcpufDestinationAmount: stringToNumberCents(
        //   invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vDesc[0]
        // ),
        // icmsufDestinationAmount: stringToNumberCents(
        //   invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vDesc[0]
        // ),
        // icmsufSenderAmount: stringToNumberCents(
        //   invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vDesc[0]
        // ),
        // federalTaxesAmount: stringToNumberCents(
        //   invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vDesc[0]
        // ),
        fcpAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vFCP[0]
        ),
        fcpstAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vFCPST[0]
        ),
        fcpstRetAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vFCPSTRet[0]
        ),
        ipiDevolAmount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vIPIDevol[0]
        ),
      },
      //   issqn: {
      //     totalServiceNotTaxedICMS: 0,
      //     baseRateISS: 0,
      //     totalISS: 0,
      //     valueServicePIS: 0,
      //     valueServiceCOFINS: 0,
      //     provisionService: "2022-05-20T01:35:53.658Z",
      //     deductionReductionBC: 0,
      //     valueOtherRetention: 0,
      //     discountUnconditional: 0,
      //     discountConditioning: 0,
      //     totalRetentionISS: 0,
      //     codeTaxRegime: 0,
      //   },
      // },
      transport: {
        freightModality: invoice.nfeProc.NFe[0].infNFe[0].transp[0].modFrete[0],
        transportGroup: {
          cnpj: invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0]
            .CNPJ[0],
          name: invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0]
            .xNome[0],
          cityName:
            invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0].xNome[0],
          // cpf: invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0].cpf[0],
          stateTaxNumber:
            invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0].IE[0],
          state: invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0].UF[0],
          city: invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0]
            .xMun[0],
          fullAddress:
            invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0].xEnder[0],
          //     transportRetention: invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0].xNome[0],
        },
        //   reboque: {
        //     plate: "string",
        //     uf: "string",
        //     rntc: "string",
        //     wagon: "string",
        //     ferry: "string",
        //   },
        volume: {
          volumeQuantity:
            invoice.nfeProc.NFe[0].infNFe[0].transp[0].vol[0].qVol[0],
          //  species: "string",
          //  brand: "string",
          //  volumeNumeration: "string",
          netWeight: invoice.nfeProc.NFe[0].infNFe[0].transp[0].vol[0].pesoL[0],
          grossWeight:
            invoice.nfeProc.NFe[0].infNFe[0].transp[0].vol[0].pesoB[0],
        },
        //   transportVehicle: {
        //     plate: "string",
        //     state: "string",
        //     rntc: "string",
        //   },
        //   sealNumber: "string",
        //   transpRate: {
        //     serviceAmount: 0,
        //     bcRetentionAmount: 0,
        //     icmsRetentionRate: 0,
        //     icmsRetentionAmount: 0,
        //     cfop: 0,
        //     cityGeneratorFactCode: 0,
      },
    },
    // additionalInformation: {
    //   fisco: "string",
    //   taxpayer: "string",
    //   xmlAuthorized: [0],
    //   effort: "string",
    //   order: "string",
    //   contract: "string",
    //   taxDocumentsReference: [
    //     {
    //       taxCouponInformation: {
    //         modelDocumentFiscal: "string",
    //         orderECF: "string",
    //         orderCountOperation: 0,
    //       },
    //       documentInvoiceReference: {
    //         state: 0,
    //         yearMonth: "string",
    //         federalTaxNumber: "string",
    //         model: "string",
    //         series: "string",
    //         number: "string",
    //       },
    //       accessKey: "string",
    //     },
    //   ],
    //   taxpayerComments: [
    //     {
    //       field: "string",
    //       text: "string",
    //     },
    //   ],
    //   referencedProcess: [
    //     {
    //       identifierConcessory: "string",
    //       identifierOrigin: 0,
    //     },
    //   ],
    // },
    // protocol: {
    //   id: "string",
    //   environmentType: "production",
    //   applicationVersion: "string",
    //   accessKey: "string",
    //   receiptOn: "2022-05-20T01:35:53.659Z",
    //   protocolNumber: "string",
    //   validatorDigit: "string",
    //   statusCode: 0,
    //   description: "string",
    //   signature: "string",
    // },
    duplicates: mapDuplicates(invoice.nfeProc.NFe[0].infNFe[0].cobr[0].dup),
    items: mapItems(invoice.nfeProc.NFe[0].infNFe[0].det),
    // items: [
    //   {
    //     code: "string",
    //     codeGTIN: "string",
    //     description: "string",
    //     ncm: "string",
    //     extipi: "string",
    //     cfop: 0,
    //     unit: "string",
    //     quantity: 0,
    //     unitAmount: 0,
    //     totalAmount: 0,
    //     eanTaxableCode: "string",
    //     unitTax: "string",
    //     quantityTax: 0,
    //     taxUnitAmount: 0,
    //     freightAmount: 0,
    //     insuranceAmount: 0,
    //     discountAmount: 0,
    //     othersAmount: 0,
    //     totalIndicator: true,
    //     cest: "string",
    //     tax: {
    //       totalTax: 0,
    //       icms: {
    //         origin: "string",
    //         cst: "string",
    //         baseTaxModality: "string",
    //         baseTax: 0,
    //         baseTaxSTModality: "string",
    //         baseTaxSTReduction: 0,
    //         baseTaxSTAmount: 0,
    //         baseTaxReduction: 0,
    //         stRate: 0,
    //         stAmount: 0,
    //         stMarginAmount: 0,
    //         csosn: "string",
    //         rate: 0,
    //         amount: 0,
    //         snCreditRate: "string",
    //         snCreditAmount: "string",
    //         stMarginAddedAmount: "string",
    //         stRetentionAmount: "string",
    //         baseSTRetentionAmount: "string",
    //         baseTaxOperationPercentual: "string",
    //         ufst: "string",
    //         amountSTUnfounded: 0,
    //         amountSTReason: "string",
    //         baseSNRetentionAmount: "string",
    //         snRetentionAmount: "string",
    //         amountOperation: "string",
    //         percentualDeferment: "string",
    //         baseDeferred: "string",
    //         fcpRate: 0,
    //         fcpAmount: 0,
    //         fcpstRate: 0,
    //         fcpstAmount: 0,
    //         fcpstRetRate: 0,
    //         fcpstRetAmount: 0,
    //         bcfcpstAmount: 0,
    //         finalConsumerRate: 0,
    //         bcstRetIssuerAmount: 0,
    //         stRetIssuerAmout: 0,
    //         bcstBuyerAmount: 0,
    //         stBuyerAmout: 0,
    //         substituteAmount: 0,
    //       },
    //       ipi: {
    //         classification: "string",
    //         producerCNPJ: "string",
    //         stampCode: "string",
    //         stampQuantity: 0,
    //         classificationCode: "string",
    //         cst: "string",
    //         base: "string",
    //         rate: 0,
    //         unitQuantity: 0,
    //         unitAmount: 0,
    //         amount: 0,
    //       },
    //       ii: {
    //         baseTax: "string",
    //         customsExpenditureAmount: "string",
    //         amount: 0,
    //         iofAmount: 0,
    //       },
    //       pis: {
    //         cst: "string",
    //         baseTax: 0,
    //         rate: 0,
    //         amount: 0,
    //         baseTaxProductQuantity: 0,
    //         productRate: 0,
    //       },
    //       cofins: {
    //         cst: "string",
    //         baseTax: 0,
    //         rate: 0,
    //         amount: 0,
    //         baseTaxProductQuantity: 0,
    //         productRate: 0,
    //       },
    //       icmsDestination: {
    //         vBCUFDest: 0,
    //         pFCPUFDest: 0,
    //         pICMSUFDest: 0,
    //         pICMSInter: 0,
    //         pICMSInterPart: 0,
    //         vFCPUFDest: 0,
    //         vICMSUFDest: 0,
    //         vICMSUFRemet: 0,
    //         vBCFCPUFDest: 0,
    //       },
    //     },
    //     additionalInformation: "string",
    //     numberOrderBuy: "string",
    //     itemNumberOrderBuy: 0,
    //     medicineDetail: {
    //       maximumPrice: 0,
    //       anvisaCode: "string",
    //       batchId: "string",
    //       batchQuantity: 0,
    //       manufacturedOn: "2022-05-20T01:35:53.659Z",
    //       expireOn: "2022-05-20T01:35:53.659Z",
    //     },
    //     fuel: {
    //       codeANP: "string",
    //       percentageNG: 0,
    //       descriptionANP: "string",
    //       percentageGLP: 0,
    //       percentageNGn: 0,
    //       percentageGNi: 0,
    //       startingAmount: 0,
    //       codif: "string",
    //       amountTemp: 0,
    //       stateBuyer: "string",
    //       cide: {
    //         bc: 0,
    //         rate: 0,
    //         cideAmount: 0,
    //       },
    //       pump: {
    //         spoutNumber: 0,
    //         number: 0,
    //         tankNumber: 0,
    //         beginningAmount: 0,
    //         endAmount: 0,
    //       },
    //     },
    //   },
    // ],
    // billing: {
    //   bill: {
    //     number: "string",
    //     originalAmount: 0,
    //     discountAmount: 0,
    //     netAmount: 0,
    //   },
    //   ],
    // },
    // payment: [
    //   {
    //     paymentDetail: [
    //       {
    //         method: "cash",
    //         amount: 0,
    //         card: {
    //           federalTaxNumber: "string",
    //           flag: "visa",
    //           authorization: "string",
    //           integrationPaymentType: "integrated",
    //         },
    //       },
    //     ],
    //     payBack: 0,
    //   },
    // ],
  };
}

function stringToNumberCents(string: String) {
  const number = string.split(".");
  return Number(`${number[0]}${number[1].substring(0, 2)}`);
}

function mapDuplicates(duplicates: any) {
  const mappedDuplicates = duplicates.map(
    (dup: { nDup: String[]; vDup: String[]; dVenc: String[] }) => ({
      number: Number(dup.nDup[0]),
      amount: stringToNumberCents(dup.vDup[0]),
      dueDate: dup.dVenc[0],
    })
  );

  return mappedDuplicates;
}

function mapItems(items: any) {
  function mapCest(cest: String[]) {
    if (cest === undefined || cest === null) return null;

    return cest[0];
  }

  const mappedItems = items.map((item) => ({
    number: Number(item.$.nItem),
    code: item.prod[0].cProd[0],
    codeGTIN: item.prod[0].cEAN[0],
    description: item.prod[0].xProd[0],
    ncm: item.prod[0].NCM[0],
    cest: mapCest(item.prod[0].CEST),
    extipi: item.prod[0].cProd[0],
    cfop: Number(item.prod[0].CFOP[0]),
    unit: item.prod[0].uCom[0],
    quantity: Number(item.prod[0].qCom[0]),
    unitAmount: stringToNumberCents(item.prod[0].vUnCom[0]),
    totalAmount: stringToNumberCents(item.prod[0].vProd[0]),
    eanTaxableCode: item.prod[0].cEANTrib[0],
    unitTax: item.prod[0].uTrib[0],
    quantityTax: Number(item.prod[0].qTrib[0]),
    // taxUnitAmount: stringToNumberCents(item.prod[0].vUnTrib[0]),
    // freightAmount: stringToNumberCents(item.prod[0].vUnCom[0]),
    // insuranceAmount: stringToNumberCents(item.prod[0].vUnCom[0]),
    // discountAmount: stringToNumberCents(item.prod[0].vUnCom[0]),
    // othersAmount: stringToNumberCents(item.prod[0].vUnCom[0]),
    // totalIndicator: true,
    // cest: item.prod[0].cProd[0],
    // tax: {
    //   totalTax: 0,
    icms: mapIcms(item.imposto[0].ICMS[0]),
    // icms: {
    // origin: console.log(typeof item.imposto[0].ICMS[0].ICMS00.orig),
    //  cst: item.prod[0].cProd[0],
    //  baseTaxModality: item.prod[0].cProd[0],
    //  baseTax: 0,
    //  baseTaxSTModality: item.prod[0].cProd[0],
    //  baseTaxSTReduction: 0,
    //  baseTaxSTAmount: 0,
    //  baseTaxReduction: 0,
    //  stRate: 0,
    //  stAmount: 0,
    //  stMarginAmount: 0,
    //  csosn: item.prod[0].cProd[0],
    //  rate: 0,
    //  amount: 0,
    //  snCreditRate: item.prod[0].cProd[0],
    //  snCreditAmount: item.prod[0].cProd[0],
    //  stMarginAddedAmount: item.prod[0].cProd[0],
    //  stRetentionAmount: item.prod[0].cProd[0],
    //  baseSTRetentionAmount: item.prod[0].cProd[0],
    //  baseTaxOperationPercentual: item.prod[0].cProd[0],
    //  ufst: item.prod[0].cProd[0],
    //  amountSTUnfounded: 0,
    //  amountSTReason: item.prod[0].cProd[0],
    //  baseSNRetentionAmount: item.prod[0].cProd[0],
    //  snRetentionAmount: "string",
    //  amountOperation: "string",
    //  percentualDeferment: "string",
    //  baseDeferred: "string",
    //  fcpRate: 0,
    //  fcpAmount: 0,
    //  fcpstRate: 0,
    //  fcpstAmount: 0,
    //  fcpstRetRate: 0,
    //  fcpstRetAmount: 0,
    //  bcfcpstAmount: 0,
    //  finalConsumerRate: 0,
    //  bcstRetIssuerAmount: 0,
    //  stRetIssuerAmout: 0,
    //  bcstBuyerAmount: 0,
    //  stBuyerAmout: 0,
    //  substituteAmount: 0,
    // },
    ipi: mapIpi(item.imposto[0].IPI[0]),
    // ipi: {
    //  classification: "string",
    //  producerCNPJ: "string",
    //  stampCode: "string",
    //  stampQuantity: 0,
    //  classificationCode: "string",
    //  cst: "string",
    //  base: "string",
    //  rate: 0,
    //  unitQuantity: 0,
    //  unitAmount: 0,
    //  amount: 0,
    // },
    //   ii: {
    //     baseTax: "string",
    //     customsExpenditureAmount: "string",
    //     amount: 0,
    //     iofAmount: 0,
    //   },
    //   pis: {
    //     cst: "string",
    //     baseTax: 0,
    //     rate: 0,
    //     amount: 0,
    //     baseTaxProductQuantity: 0,
    //     productRate: 0,
    //   },
    //   cofins: {
    //     cst: "string",
    //     baseTax: 0,
    //     rate: 0,
    //     amount: 0,
    //     baseTaxProductQuantity: 0,
    //     productRate: 0,
    //   },
    //   icmsDestination: {
    //     vBCUFDest: 0,
    //     pFCPUFDest: 0,
    //     pICMSUFDest: 0,
    //     pICMSInter: 0,
    //     pICMSInterPart: 0,
    //     vFCPUFDest: 0,
    //     vICMSUFDest: 0,
    //     vICMSUFRemet: 0,
    //     vBCFCPUFDest: 0,
    //   },
    // },
    // additionalInformation: "string",
    // numberOrderBuy: "string",
    // itemNumberOrderBuy: 0,
    // medicineDetail: {
    //   maximumPrice: 0,
    //   anvisaCode: "string",
    //   batchId: "string",
    //   batchQuantity: 0,
    //   manufacturedOn: "2022-05-20T01:35:53.659Z",
    //   expireOn: "2022-05-20T01:35:53.659Z",
    // },
    // fuel: {
    //   codeANP: "string",
    //   percentageNG: 0,
    //   descriptionANP: "string",
    //   percentageGLP: 0,
    //   percentageNGn: 0,
    //   percentageGNi: 0,
    //   startingAmount: 0,
    //   codif: "string",
    //   amountTemp: 0,
    //   stateBuyer: "string",
    //   cide: {
    //     bc: 0,
    //     rate: 0,
    //     cideAmount: 0,
    //   },
    //   pump: {
    //     spoutNumber: 0,
    //     number: 0,
    //     tankNumber: 0,
    //     beginningAmount: 0,
    //     endAmount: 0,
    //   },
    // },
  }));

  return mappedItems;
}

function mapIcms(icmsRaw: Object) {
  const icms = Object.values(icmsRaw)[0][0];

  return {
    origin: icms.orig[0],
    cst: icms.CST[0],
    baseTaxModality: icms.modBC[0],
    baseTax: stringToNumberCents(icms.vBC[0]),
    baseTaxSTModality: icms.modBCST ? icms.modBCST[0] : 0,
    baseTaxSTReduction: icms.pMVAST ? icms.pMVAST[0] : 0,
    baseTaxSTAmount: icms.vBCST ? stringToNumberCents(icms.vBCST[0]) : 0,
    stRate: icms.pICMSST ? icms.pICMSST[0] : 0,
    stAmount: icms.vICMSST ? stringToNumberCents(icms.vICMSST[0]) : 0,
    rate: icms.pICMS ? icms.pICMS[0] : 0,
    amount: stringToNumberCents(icms.vICMS[0]),
    fcpStRate: icms.pFCPST ? icms.pFCPST[0] : 0,
    fcpstAmount: icms.vFCPST ? stringToNumberCents(icms.vFCPST[0]) : 0,
    bcfcpstAmount: icms.vBCFCPST ? stringToNumberCents(icms.vBCFCPST[0]) : 0,
  };
}

function mapIpi(ipiRaw: any) {
  function ipiSt(st: String[]) {
    if (st === undefined || st === null) return 0;

    return stringToNumberCents(st[0]);
  }

  return {
    classification: ipiRaw.cEnq[0],
    cst: Object.values(ipiRaw)[1][0].CST[0],
    base: ipiSt(Object.values(ipiRaw)[1][0].vBC),
    rate: ipiSt(Object.values(ipiRaw)[1][0].pIPI),
    amount: ipiSt(Object.values(ipiRaw)[1][0].vIPI),
  };
}