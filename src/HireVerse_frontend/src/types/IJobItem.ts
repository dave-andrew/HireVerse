export interface IJobItem {
    id: string;
    position: string;
    location: string;
    currency: string;
    salaryStart: string;
    salaryEnd: string;
    companyName: string;
    companyImage: number[] | Uint8Array;
}
