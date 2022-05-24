import { decode } from "js-base64";
import { parseString } from "xml2js";
import * as supplierRepo from "../repositories/supplierRepo.js";
import * as invoiceRepo from "../repositories/invoiceRepo.js";
import * as supplierService from "../services/supplierService.js";
import * as error from "../utils/errorUtils.js";

export async function invoiceByXml(xmlBase64: string) {
  const xml = decode(xmlBase64);
  let xmlJson: Object;

  parseString(xml, (_err: any, result: any) => {
    xmlJson = result;
  });

  const invoice = mapInvoiceJson(xmlJson);

  return invoice;
}

function mapInvoiceJson(invoice: any) {
  return {
    accessKey: invoice.nfeProc.NFe[0].infNFe[0].$.Id.replace("NFe", ""),
    operationNature: invoice.nfeProc.NFe[0].infNFe[0].ide[0].natOp[0],
    serie: invoice.nfeProc.NFe[0].infNFe[0].ide[0].serie[0],
    number: invoice.nfeProc.NFe[0].infNFe[0].ide[0].nNF[0],
    issuedOn: invoice.nfeProc.NFe[0].infNFe[0].ide[0].dhEmi[0],
    xmlVersion: invoice.nfeProc.NFe[0].infNFe[0].$.versao,
    issuer: {
      cnpj: invoice.nfeProc.NFe[0].infNFe[0].emit[0].CNPJ[0],
      name: invoice.nfeProc.NFe[0].infNFe[0].emit[0].xNome[0],
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
        street: invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xLgr[0],
        number: invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].nro[0],
        country: invoice.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xPais[0],
      },
      stateTaxNumber: invoice.nfeProc.NFe[0].infNFe[0].dest[0].IE[0],
      stateTaxNumberIndicator:
        invoice.nfeProc.NFe[0].infNFe[0].dest[0].indIEDest[0],
    },
    totals: {
      amount: stringToNumberCents(
        invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vNF[0]
      ),
      productAmount: stringToNumberCents(
        invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vProd[0]
      ),
      taxes: {
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
        },
        ii: {
          amount: stringToNumberCents(
            invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vII[0]
          ),
        },
        ipi: {
          amount: stringToNumberCents(
            invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vIPI[0]
          ),
          devolAmount: stringToNumberCents(
            invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vIPIDevol[0]
          ),
        },
        pis: {
          amount: stringToNumberCents(
            invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vPIS[0]
          ),
        },
        cofins: {
          amount: stringToNumberCents(
            invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vCOFINS[0]
          ),
        },
        fcp: {
          amount: stringToNumberCents(
            invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vFCP[0]
          ),
          stAmount: stringToNumberCents(
            invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vFCPST[0]
          ),
          stRetAmount: stringToNumberCents(
            invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vFCPSTRet[0]
          ),
        },
      },
      freight: {
        amount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vFrete[0]
        ),
      },
      insurance: {
        amount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vSeg[0]
        ),
      },
      discount: {
        amount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vDesc[0]
        ),
      },
      others: {
        amount: stringToNumberCents(
          invoice.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vOutro[0]
        ),
      },
      transport: {
        freightModality: invoice.nfeProc.NFe[0].infNFe[0].transp[0].modFrete[0],
        transportGroup: {
          cnpj: invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0]
            .CNPJ[0],
          name: invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0]
            .xNome[0],
          cityName:
            invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0].xNome[0],
          stateTaxNumber:
            invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0].IE[0],
          state: invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0].UF[0],
          city: invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0]
            .xMun[0],
          fullAddress:
            invoice.nfeProc.NFe[0].infNFe[0].transp[0].transporta[0].xEnder[0],
        },
        volume: {
          volumeQuantity:
            invoice.nfeProc.NFe[0].infNFe[0].transp[0].vol[0].qVol[0],
          netWeight: invoice.nfeProc.NFe[0].infNFe[0].transp[0].vol[0].pesoL[0],
          grossWeight:
            invoice.nfeProc.NFe[0].infNFe[0].transp[0].vol[0].pesoB[0],
        },
      },
    },
    duplicates: mapDuplicates(invoice.nfeProc.NFe[0].infNFe[0].cobr[0].dup),
    items: mapItems(invoice.nfeProc.NFe[0].infNFe[0].det),
  };
}

function stringToNumberCents(string: string) {
  const number = string.split(".");
  return Number(`${number[0]}${number[1].substring(0, 2)}`);
}

function mapDuplicates(duplicates: any) {
  const mappedDuplicates = duplicates.map(
    (dup: { nDup: string[]; vDup: string[]; dVenc: string[] }) => ({
      number: Number(dup.nDup[0]),
      amount: stringToNumberCents(dup.vDup[0]),
      dueDate: dup.dVenc[0],
    })
  );

  return mappedDuplicates;
}

function mapItems(items: any) {
  function mapCest(cest: string[]) {
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
    icms: mapIcms(item.imposto[0].ICMS[0]),
    ipi: mapIpi(item.imposto[0].IPI[0]),
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
  function ipiSt(st: string[]) {
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

export async function registerInvoiceByXml(xmlBase64: string) {
  const invoice = await invoiceByXml(xmlBase64);

  let supplier = await supplierRepo.findByCnpj(invoice.issuer.cnpj);

  if (supplier === null) {
    supplier = await supplierService.registerByCnpjStateTaxNumber(
      invoice.issuer.cnpj,
      invoice.issuer.stateTaxNumber
    );
  }

  const existingInvoice = await invoiceRepo.findByAccessKey(invoice.accessKey);
  if (existingInvoice !== null)
    throw error.conflict("Invoice already registered");

  const invoiceToDb = {
    access_key: invoice.accessKey,
    supplier_id: supplier.id,
    products_cost: invoice.totals.productAmount,
    total_cost: invoice.totals.amount,
    installments_quantity: invoice.duplicates.length,
    salesperson_id: null,
  };

  const invoiceInfoToDb = {
    number: invoice.number,
    serie: invoice.serie,
    ipi: invoice.totals.taxes.ipi.amount,
    icms_st: invoice.totals.taxes.icms.stAmount,
    fcp_st: invoice.totals.taxes.fcp.stAmount,
    shipping: invoice.totals.freight.amount,
    shipper_id: null,
    discount: invoice.totals.discount.amount,
    others_expenses: invoice.totals.others.amount,
    issue_date: invoice.issuedOn,
    obs: null,
  };

  await invoiceRepo.insert(invoiceToDb, invoiceInfoToDb);

  return invoice;
}
