import axios from "axios";
import * as supplierRepo from "../repositories/supplierRepo.js";
import * as addressRepo from "../repositories/addressRepo.js";
import * as error from "../utils/errorUtils.js";

export async function registerByCnpjStateTaxNumber(
  cnpj: string,
  stateTaxNumber: string
) {
  const { data: company } = await axios.get(
    `https://receitaws.com.br/v1/cnpj/${cnpj}`
  );

  if (company === null) throw error.conflict("Company not found in Receita");

  const address = await addressRepo.insert({
    cep: company.cep,
    country: "BR",
    state: company.uf,
    city: company.municipio,
    district: company.bairro,
    address: company.logradouro,
    number: company.numero,
    complement: company.complemento,
  });

  const supplier = await supplierRepo.insert({
    cnpj,
    company_name: company.nome,
    trade_name: company.fantasia,
    state_registration: stateTaxNumber,
    type: company.tipo,
    phone_number: company.telefone,
    email: company.email,
    address_id: address.id,
  });

  return supplier;
}
