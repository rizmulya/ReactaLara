<?php // php artisan make:trait Trait/Decryptor

namespace App\Trait;

use Nullix\CryptoJsAes\CryptoJsAes;

trait Decryptor
{
    /**
     * Decrypts the given encrypted ID and finds the specified model.
     *
     * @param string $modelClass The model class name.
     * @param mixed $encryptedId The encrypted ID.
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public static function decryptId(string $modelClass, $encryptedId)
    {
        try {
            $decryptedId = CryptoJsAes::decrypt(base64_decode($encryptedId), config('app.cryptojskey'));
        } catch (\Exception $e) {
            abort(403, 'Access Denied');
        }

        return $modelClass::findOrFail($decryptedId);
    }

    /**
     * Encrypts the given value.
     *
     * @param mixed $value The value to encrypt.
     * @return string The encrypted value.
     */
    public static function useEncrypt($value)
    {
        return base64_encode(CryptoJsAes::encrypt($value, config('app.cryptojskey')));
    }
}
