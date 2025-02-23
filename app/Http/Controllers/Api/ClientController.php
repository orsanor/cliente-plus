<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        return Client::paginate(10);
    }

    public function store(ClientRequest $request)
    {
        $data = $request->validated();
        $client = Client::create($data);

        return response()->json([
            'message' => 'Cliente criado com sucesso',
            'client' => new ClientResource($client)
        ], 201);
    }

    public function show(Client $client)
    {
        return new ClientResource($client);
    }

    public function update(ClientRequest $request, Client $client)
    {
        $data = $request->validated();
        $client->update($data);

        return response()->json([
            'message' => 'Cliente atualizado com sucesso',
            'client' => new ClientResource($client)
        ]);
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return response()->json([
            'message' => 'Cliente deletado com sucesso'
        ], 200);
    }
} 