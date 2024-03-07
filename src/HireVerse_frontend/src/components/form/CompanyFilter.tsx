import CustomTextField from "./CustomTextField";
import CardLayout from "../../layouts/CardLayout";
import { getCompanies } from "../../datas/queries/jobQueries";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import handleKeyDown from "../../utils/handleKeyDown";

export interface IFilterCompanyForm {
   location: string,
   industries: string
}

interface Props {
   onApplyFilter: (data: IFilterCompanyForm) => void;
}

export const defaultValues: IFilterCompanyForm = {
   location: "",
   industries: ""
};

export default function CompanyFilter({ onApplyFilter }: Props) {

   const { data: industries, refetch: getIndustries } = getCompanies();
   const { register, control, getValues, handleSubmit } = useForm<IFilterCompanyForm>({
      defaultValues,
   });

   const onSubmit = () => {
      console.log("hai")
      onApplyFilter(getValues());
   };

   useEffect(() => {
      getIndustries();
   }, []);

   return (
      <>
         <CardLayout className="h-fit flex w-72 flex-col gap-2 p-4">
            <div className="p-1 text-lg font-bold">Filter Companies</div>
            <hr />
            <div className="flex flex-col gap-6 p-4 w-full">
               <label htmlFor="location" className="w-full">
                  <div className="text-xs font-bold">Location</div>
                  <input
                     {...register("location")}
                     type="text"
                     className="border-b border-gray-900 outline-0 w-full"
                     onKeyDown={(e) => handleKeyDown(e.key, "Enter", onSubmit)}
                  />
               </label>
               <label htmlFor="industries" className="w-full">
                  <div className="text-xs font-bold">Industries</div>
                  <input
                     {...register("industries")}
                     type="text"
                     name="industries"
                     className="border-b border-gray-900 outline-0 w-full"
                     onKeyDown={(e) => handleKeyDown(e.key, "Enter", onSubmit)}
                  />
               </label>
            </div>
            <hr />
         </CardLayout>
      </>
   )
}