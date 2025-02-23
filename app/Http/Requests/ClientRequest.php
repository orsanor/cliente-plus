<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $clientId = $this->route('client')?->id;
        
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email,' . $clientId,
            'phone_number' => 'required|string|max:20',
            'cep' => 'required|string|max:9',
            'address' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório',
            'name.string' => 'O nome deve ser um texto',
            'name.max' => 'O nome não pode ter mais que 255 caracteres',
            'email.required' => 'O email é obrigatório',
            'email.email' => 'Digite um email válido',
            'email.unique' => 'Este email já está em uso',
            'phone_number.required' => 'O telefone é obrigatório',
            'phone_number.max' => 'O telefone não pode ter mais que 20 caracteres',
            'cep.required' => 'O CEP é obrigatório',
            'cep.max' => 'O CEP não pode ter mais que 9 caracteres',
            'address.required' => 'O endereço é obrigatório',
            'address.max' => 'O endereço não pode ter mais que 255 caracteres'
        ];
    }
} 