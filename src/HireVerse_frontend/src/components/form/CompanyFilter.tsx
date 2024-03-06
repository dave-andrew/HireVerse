import CustomTextField from "./CustomTextField";
import CardLayout from "../../layouts/CardLayout";
import { getCompanies } from "../../datas/queries/jobQueries";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import handleKeyDown from "../../utils/handleKeyDown";

export interface IFilterCompanyForm {
   location: string,
   industries: string,
   experience: string
}

interface Props {
   onApplyFilter: (data: IFilterCompanyForm) => void;
}

export const defaultValues: IFilterCompanyForm = {
   location: "",
   industries: "",
   experience: ""
};

export default function CompanyFilter({ onApplyFilter }: Props) {

   const { data: industries, refetch: getIndustries } = getCompanies();
   const { register, control, handleSubmit } = useForm<IFilterCompanyForm>({
      defaultValues,
   });

   const onSubmit = (data: IFilterCompanyForm) => {
      onApplyFilter(data);
   };

   useEffect(() => {
      getIndustries();
   }, []);

   return (
      <>
         <CardLayout className="h-[70vh] flex w-72 flex-col gap-2 p-4">
            <div className="p-1 text-lg font-bold">Filter Companies</div>
            <hr />
            <div className="flex flex-col gap-6 p-4">
               <input
                  {...register("location")}
                  type="text"
                  className="border-b border-gray-900 outline-0"
                  onKeyDown={(e) => handleKeyDown(e.key, "Enter", onSubmit)}
               />
               <input
                  {...register("industries")}
                  type="text"
                  className="border-b border-gray-900 outline-0"
                  onKeyDown={(e) => handleKeyDown(e.key, "Enter", onSubmit)}
               />
            </div>
            <hr />
            <div className="flex flex-col gap-2 p-4">
               <div className="text-xs font-bold">Experience</div>
               <div className="grid grid-cols-2 gap-2">
               <div className="flex items-center">
                     <input
                        type="checkbox"
                        value="full-time"
                        defaultChecked={true}
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                     />
                     <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full-Time</label>
                  </div>
                  <div className="flex items-center">
                     <input
                        type="checkbox"
                        value="part-time"
                        defaultChecked={true}
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                     />
                     <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Part-Time</label>
                  </div>
                  <div className="flex items-center">
                     <input
                        type="checkbox"
                        value="internship"
                        defaultChecked={true}
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                     />
                     <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Internship</label>
                  </div>
                  <div className="flex items-center">
                     <input
                        type="checkbox"
                        value="volunteer"
                        defaultChecked={true}
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                     />
                     <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Volunteer</label>
                  </div>
               </div>
            </div>
         </CardLayout>
      </>
   )
}