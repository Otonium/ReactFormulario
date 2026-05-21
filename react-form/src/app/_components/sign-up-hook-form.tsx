//-------------------------------------------------
// PROCEDIMENTO DO CLIENTE - obrigatoria no Next.js
//-------------------------------------------------

"use client";

//-----------------------------------------------
// IMPORTAÇÕES
//-----------------------------------------------

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

import { signUpFormSchema, SignUpFormSchema } from "../_schemas/auth-schema";

import { zodResolver } from "@hookform/resolvers/zod";

//------------------------------------------------
// Função que monta o formulário
//------------------------------------------------

export default function SignUpHookform() {
    //-----------------------------------------------
    // useForm - configurando o gerente do formulário
    //-----------------------------------------------

    const {register, handleSubmit, formState: {errors},} =
    useForm<SignUpFormSchema>({resolver: zodResolver(signUpFormSchema),});

    //---------------------------------------------------
    // onSubmit - envia formulario
    //---------------------------------------------------

    function onSubmit(payload: SignUpFormSchema) {
        console.log("submit", payload);
    }

    //-------------------------------------------------------
    // RETURN 
    //-------------------------------------------------------
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-96 mx-auto mt-10">
            {/* CAMPO: NOME */}
            <div>{/* Agrupa input e mensagem de erro */}
                <Input placeholder="Nome" {...register("name")} />
                {errors?.name && (
                    <div className="text-red-500 text-xs">{errors?.name?.message}</div>
                )}
            </div>

            {/* CAMPO: EMAIL */}
            <div>
                <Input placeholder="Email" type="email" {...register("email")}/>
                {errors?.email && (
                    <div className="text-red-500 text-xs">{errors?.email?.message}</div>
                )}
            </div>

            {/* CAMPO: SENHA */}
            <div>
                <Input placeholder="Senha" type="password" {...register("password")} />
                {errors?.password && (
                    <div className="text-red-500 text-xs">
                        {errors?.password?.message}
                    </div>
                )}
            </div>

            {/* CAMPO: CONFIRMAR SENHA */}
            <div>
                <Input placeholder="Confirmar Senha" {...register("confirmPassword")}/>

                {errors?.confirmPassword && (
                    <div className="text-red-500 text-xs">
                        {errors?.confirmPassword?.message}
                    </div>
                )}
            </div>

            {/* BOTÃO ENVIO */}
            <Button>Cadastrar</Button>
        </form>
    );
}