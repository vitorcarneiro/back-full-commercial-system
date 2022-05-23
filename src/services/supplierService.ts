// import * as supplierRepo from "../repositories/supplierRepo.js";
// import * as addressRepo from "../repositories/addressRepo.js";

// export async function findByCnpj(cnpj: string) {
//   return await supplierRepo.findByCnpj(cnpj);
// }

// // export async function create(
// //   CreateSupplierData: supplierRepo.CreateSupplierData
// // ) {
// //   const supplier = new Supplier(CreateSupplierData);

// //   await supplierRepo.insert(supplier);
// // }

// // function Supplier(CreateSupplierData: supplierRepo.CreateSupplierData) {
// //   const {
// //     cnpj,
// //     company_name: companyName,
// //     trade_name: tradeName,
// //     state_registration: stateRegistration,
// //     state_registration_subst: stateRegistrationSubst,
// //     type,
// //     uf,
// //     phone_number: phoneNumber,
// //     email,
// //     address_id: addressId,
// //   } = CreateSupplierData;

// //   this.cnpj = cnpj;
// //   this.company_name = companyName;
// //   this.trade_name = tradeName;
// //   this.state_registration = stateRegistration;
// //   this.state_registration_subst = stateRegistrationSubst;
// //   this.type = type;
// //   this.uf = uf;
// //   this.phone_number = phoneNumber;
// //   this.email = email;
// //   this.address_id = addressId;
// // }

// export type SupplierNoAdress = Omit<
//   supplierRepo.CreateSupplierData,
//   "address_id"
// >;

// export interface SupplierFromInvoice {
//   cnpj: string;
//   name: string;
//   phone: string;
//   address: {
//     postalCode: string;
//     state: string;
//     country: string;
//     city: {
//       code: string;
//       name: string;
//     };
//     district: string;
//     street: string;
//     number: string;
//   };
//   stateTaxNumber: string;
//   codeTaxRegime: string;
// }

// export type AddresFromSupplier = Omit<
//   SupplierFromInvoice,
//   "cnpj" | "name" | "phone"
// >;

// export async function registerSupplierByInvoice(
//   supplierData: SupplierFromInvoice
// ) {
//   let supplier = await findByCnpj(supplierData.cnpj);

//   if (supplier === null) {
//     const address = await registerAddressBySupplier(supplierData.address);
//     supplier = create({
//       cnpj: supplierData.cnpj,
//       company_name: supplierData.name,
//       trade_name: null,
//       state_registration: null,
//       state_registration_subst: supplierData.stateTaxNumber,
//       type: null,
//       uf: address.city.name,
//       phone_number: supplierData.phone,
//       email: null,
//       address_id: address.id,
//     });
//   }
// }

// export async function registerAddressBySupplier(addressSupplier: any) {
//   const address = await addressRepo.insert({
//     cep: addressSupplier.postalCode,
//     state: null,
//     city: addressSupplier.city.name,
//     number: addressSupplier.number,
//     address: addressSupplier.street,
//     complement: addressSupplier.additionalInformation,
//     country: null,
//   });

//   return address;
// }
