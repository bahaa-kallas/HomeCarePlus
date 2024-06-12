import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CirclePlus, TrashIcon } from "lucide-react";
import { ServiceCreateForm } from "@/routes/store.services_.create";
import { Input } from "@/components/ui/input";
import LocalizedInput from "@/components/localized-input";
import { Label } from "@/components/ui/label";

export default function ServicePropertiesEditor() {
  const { control, register } = useFormContext<ServiceCreateForm>();
  const propertiesFieldArray = useFieldArray({
    name: "properties",
    control: control,
  });

  const addProperty = (value: string) => {
    if (value == "text") {
      propertiesFieldArray.append({
          type: "text",
          name: { en: "", ar: "" },
          options: [{ en: "", ar: "" }],
        },
      );
    } else if (value == "number") {
      propertiesFieldArray.append({
          type: "number",
          name: { en: "", ar: "" },
          options: [],
        },
      );
    }
  };

  const deleteProperty = (index: number) => {
    propertiesFieldArray.remove(index);
  };

  return <Card>
    <CardHeader>
      <CardTitle>Service Properties</CardTitle>
      <CardDescription>
        Add options customers can personalize their service with (e.g., number of cleaners, room selection
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-6">
      <div className="flex flex-col gap-2 justify-center">
        {propertiesFieldArray.fields.map((field, index) => {
          return <Card key={field.id}>
            <CardHeader>
              <CardTitle>{capitalize(field.type)} Based Question</CardTitle>
              <CardDescription>Enter the question details below</CardDescription>

            </CardHeader>
            <CardContent>
              <div className="flex flex-col mb-2 gap-2">
                <LocalizedInput register={register} formName={`properties.${index}.name`} />
                <OptionsArray type={field.type} nestIndex={index} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="button" className="w-full" variant="destructive" onClick={() => deleteProperty(index)}>Delete
                Property</Button>
            </CardFooter>
          </Card>;
        })}
        <div className="flex flex-row gap-2 justify-center">
          <Button type="button" variant="outline" onClick={() => addProperty("text")}>
            <CirclePlus className="w-4 me-2" />Text Based Property
          </Button>
          <Button type="button" variant="outline" onClick={() => addProperty("number")}>
            <CirclePlus className="w-4 me-2" />Number Based Property
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>;
}


export function OptionsArray({ type, nestIndex }: {
  type: string
  nestIndex: number,
}) {

  const { register, control } = useFormContext<ServiceCreateForm>();
  const optionsFieldArray = useFieldArray({
    control,
    name: `properties.${nestIndex}.options`,
  });

  const addOption = () => {
    if (type == "text") {
      optionsFieldArray.append({ en: "", ar: "" });
    } else if (type == "number") {
      optionsFieldArray.append(3);
    }
  };

  const deleteOption = (index: number) => {
    optionsFieldArray.remove(index);
  };

  return <div className="flex flex-col  gap-2">
    <Label>Answer Options</Label>
    {optionsFieldArray.fields.map((field, index) => {
      return <div key={field.id} className="flex flex-row gap-2 mb-2">
        {type == "text" ? <LocalizedInput type={type} className="flex-1" register={register}
                                          formName={`properties.${nestIndex}.options.${index}`} /> :
          <Input type={type} className="flex-1" {...register(`properties.${nestIndex}.options.${index}`)} />
        }

        <Button type="button" variant="destructive" size="icon" className="p-2"
                onClick={() => deleteOption(index)}><TrashIcon
          className="w-4" /></Button>
      </div>;
    })}
    <Button type="button" onClick={() => addOption()}>Add Option</Button>
  </div>;
}


function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
