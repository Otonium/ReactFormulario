"use client";
// Comando obrigatorio no Next
// Marca que vai rodar no navegador

//-------------------------------
// IMPORTAÇÕES
//------------------------------

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { FormEvent, useRef, useState } from "react";
// Três importações do React:
//       "FormEvent" = Um TIPO TS. Evento ativado
//      quando form é confirmado
//       "useRef" = hook que cria referencia a elemento 
//      HTML
//       "useState" = memoria. Guarda valor. SE muda -> Atualiza

import { SignUpFormSchema, signUpFormSchema } from "../_schemas/auth-schema";
// Importa duas coisas do arquivo de schemas:
//       "SignUpFormSchema" (S maiusculo) = TIPO
//      marca forma dos dados: Qual campo e o tipo.
//
//       "signUpFormSchema" (s minusculo) = REGRAS de validação: 
//      condição

import { z } from "zod";
// Importa zod - biblioteca de validação
// z - objeto principal do zod, com todos metodos e tipos

// --------------------------------------------
// COMPONENTE PRINCIPAl
// ---------------------------------------------

export default function SignUpForm() {

    // ----------------------------------
    // useRef - Caminho para o formulario
    // ----------------------------------

    const formRef = useRef<HTMLFormElement>(null);
    //  "useRef<HTMLFOrmElement>(null)" = Cria referencia
    // para o elemento <form> html
    //
    //  "<HTMLFormElement>(null)" = Tipo TS marca: Direção
    // para <form> HTML
    //
    //  "(null)" = valor inicial (vazio).

    //------------------------------------
    // useState - memoria dos erros
    //------------------------------------

    const [errors, setErrors] = useState<z.ZodError<SignUpFormSchema>>();
    //  "useState<z.ZodError<SignUpFormSchema>>()" =
    // cria um estado que guarda um objeto de erros do zod.
    //
    //  "z.ZodError<SignUpFormSchema>" = tipo TS do valor.
    // ZodError é a "classe" de erros que o Zod cria quando
    // a validação falha. Contém a lista de todos os erros
    // de cada campo
    //
    //  "()" sem argumento = inicia undefined, sem erros

    //-----------------------------------------------------
    // formErrors - transformar os erros 
    //-----------------------------------------------------

    const formErrors = errors ? z.treeifyError(errors)?.properties : null;

    //------------------------------------------------------
    // handleSubmit - validador
    //------------------------------------------------------

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(formRef.current!);

        const data = Object.fromEntries(formData);

        const parsedData = signUpFormSchema.safeParse(data);

        if (!parsedData.success) {
            setErrors(parsedData.error);

            return;
        }

        setErrors(undefined);

        console.log("Formulario final, onde eu chamo a API");
    }

    //--------------------------------------------------------
    // RETURN - o JSX (a tela visual)
    //--------------------------------------------------------

    return (
        <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 w96 mx-auto mt-10">

            {/* CAMPO: NOME */}
            <div>
                <Input name="name" placeholder="Nome"/>
                {formErrors?.name && ( 
                    <div className="text-red-500 text-xs">
                        {formErrors?.name.errors[0]}
                    </div>
                )}
            </div>

            {/* CAMPO: EMAIL */}
            <div>
                <Input name="email" placeholder="Email" type="email"/>
                {formErrors?.email && (
                    <div className="text-red-500 text-xs">
                        {formErrors?.email.errors[0]}
                    </div>
                )}
            </div>

            {/* CAMPO: SENHA */}
            <div>
                <Input name="password" placeholder="Senha" type="password"/>
                {formErrors?.password && (
                    <div className="text-red-500 text-xs">
                        {formErrors?.password.errors[0]}
                    </div>
                )}
            </div>

            {/* CAMPO: CONFIRMAR SENHA */}
            <div>
                <Input name="confirmPassword" placeholder="Confirmar Senha" type="password"/>
                {formErrors?.confirmPassword && ( 
                    <div className="text-red-500 text-xs">
                        {formErrors?.confirmPassword.errors[0]}
                    </div>
                )}
            </div>

            <Button>Cadastrar</Button>
        </form>
    );
}