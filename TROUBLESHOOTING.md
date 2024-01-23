# Troubleshooting

## Dependencies

### Truffle

Truffle on you host should be at the correct version that is compatible with `openzeppelin-solidity ^1.10.0`

### Web3

Web3 version should be the same between DApp and Protocol. Different versions are not compatible. Until now version is downgraded due protocol at `^1.0.0-beta.46`

> On Vechain Blockchain this is donwgraded to version `^1.0.0-beta.37` due packages compatibility.

### Drizzle

This package has been forked from the original in order to make it compatible with Vechain. [See here](https://www.npmjs.com/package/drizzle-vechain) for more infos.

### Truffle Contract

This package has been forked from the original in order to make it compatible with Vechain. [See here](https://www.npmjs.com/package/truffle-contract-vechain) for more infos.

## Metamask

### Error: the tx doesn't have the correct nonce

To fix this error you should reset your Metamask Account.

Just click on your account avatar, then go to _Settings > Advanced > **Reset Account**_

![](https://camo.githubusercontent.com/23b0ac3478fb0dc1819f0838a2e8e815f54c258c/687474703a2f2f64333376343333396a686c386b302e636c6f756466726f6e742e6e65742f646f63732f6173736574732f3561343638336235303432383633313933383030376231352f696d616765732f3561373231653635303432383633343337366366616562362f66696c652d5976586b504d775630672e706e67)

After this operation try again your transaction and now the nonce should be calculated correctly.

## JBP

### Error in `php artisan key:generate`

You may get the following error message while setting up docker based Jur (PHP) for the first time.

> There are no commands defined in the "key" namespace.

You can see all the commands available by using `php artisan list`. In case if you don't have key generate command, you can manually generate the key. Following are the steps to generate the key:

1. Create a 32 character long random string. You can hand type or use http://www.unit-conversion.info/texttools/random-string-generator/
1. Place the generated string in `/rest/.env` file APP_KEY=

In case if you don't have `/rest/.env` then create a new file from `/rest/.env.template` and update it.

### Error in `php artisan migrate:refresh`

A migration may fail at file `2019_03_06_230134_update_proposal_on_contract_status_details_table.php` with error in SQL syntax.

This can be due to MYSQL collation issue. We need `utf8bm4` and `utf8bm4_unicode_ci`. You can check what collation your MYSQL has by running SQL `SELECT @@character_set_database, @@collation_database;`.

In case if you have any other collation (latin, swedish, etc), you can update collation. Ref: https://stackoverflow.com/questions/5906585/how-to-change-the-character-set-and-collation-throughout-a-database

To update collation for database:

```sql
ALTER DATABASE lumen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Updating database collation may not effect existing tables and columns. As you are setting up for the first time OR don't have existing data to preserve, you can delete all the tables and then update the collation. New tables will then have database set values. In case of `php artisan migrate:refresh`, it's taken care so no need to update collation at table and column level. 😉

Once collation is updated, try running `php artisan migrate:refresh`. If you still get the SQL syntax error at `2019_03_06_230134_update_proposal_on_contract_status_details_table.php`, then you have to modify the migration to make it work. Update `up` function in `/rest/database/migrations/2019_03_06_230134_update_proposal_on_contract_status_details_table.php` with the following code:

```php
public function up()
  {
    Schema::table('contract_status_details', function (Blueprint $table) {
        $table->dropColumn('contract_proposal');
    });

    Schema::table('contract_status_details', function (Blueprint $table) {
        $table->decimal('proposal_part_a')->default(0);
        $table->decimal('proposal_part_b')->default(0)->after('proposal_part_a');
    });
  }
```

Basically we are dropping a column instead of renaming. And adjusting next step to create a column instead of altering.

Now try running `php artisan migrate:refresh`. This should solve the problem. Once migration is done, you can revert back changes made in the `up` function. 🔙

### CORS issue

In browser, you may get the following CORS error:

```
Access to XMLHttpRequest at 'http://localhost/api/v1/faqs' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header contains multiple values 'http://localhost:3000, *', but only one is allowed.
```

This seems like issue with either server not returning the proper allowed value or change in web standards for representing value of multiple allowed origins.

You can try installing some browser extension to ignore/bypass CORS. If that works then great 🍿. If it doesn't solve the CORS issue then you can run Chrome with disabled security by using command `google-chrome --disable-web-security --user-data-dir=~/chromeTemp`.
