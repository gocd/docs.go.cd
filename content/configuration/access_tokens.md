---
description: GoCD personal access token
keywords: GoCD configuration, authentication, access token, token, personal access token, security, admin access token, manage access tokens
title: Access tokens
---

# Access Tokens

From GoCD server version `19.2.0` onwards, you will be able to create personal access tokens to access GoCD API(s). This will allow users to make an API call without specifying their credentials (username & password) as a part of API request headers. 

## Usage instructions
1. A token can be used to access GoCD APIs and `cctray.xml` by passing it in API header.

    > Before `19.2.0`
    
    ```bash
    curl 'https://ci.example.com/go/api/pipelines/pipeline1/status' \
           -u 'username:password'
    ```
    
    > Going forward
    
    ```bash
    curl 'https://ci.example.com/go/api/pipelines/pipeline1/status' \
           -H 'Authorization: Bearer 6A7B48094CC552B9A2DF0AFADAF50D28F0646070'
    ```

2. A token can not be used to create or access any access token related API(s).
3. Login using access token is not allowed through web UI. 
4. Once a token is revoked, the user will not be able to activate it again.
5. All tokens belonging to a user will be revoked automatically as soon as the user is deleted from GoCD.
    - Note: These tokens will not be visible again even if the same user is added back to GoCD.

## Create a token

1. Login into your GoCD server.
2. Go to user menu &rarr; **Personal Access Tokens**.
!["Navigate to personal access token"][1]

3. Click on `Generate Token` button.
!["Generate token button"][2]

4. Add a description for the token. This is to identify what is this token for?
!["Generate a token"][3]

5. Click on `Generate` button.

6. On success, you will see the newly generated token.
    
    > **_Make sure you copy the token before you close the dialog. It will not be shown again._**
    
    !["Newly generated token"][4]


## Revoke a personal token

1. Login into your GoCD server.
2. Go to user menu &rarr; **Personal Access Tokens**.
!["Navigate to personal access token"][1]

3. Find the token which you wish to revoke in `ACTIVE TOKENS` tab.
!["active access token list"][5]

4. Click on the `Revoke` button.

5. Optionally, add a reason for revoking the token.
!["revoke access token cause"][6]

6. Click on `Revoke Token` button.
7. On success, the token just revoked will be shown in `REVOKED TOKENS` tab.
!["revoked access token"][7]

## Manage access tokens (admin only)

1. Login into your GoCD server.
2. Go to **Admin** menu &rarr; Security &rarr; **Access Tokens Management**.
!["Navigate to admin access token"][8]

3. The admin will be able to see all the tokens created by all the users
    - Active tokens
    !["active access tokens"][10]

    - Revoked tokens
    !["revoked access tokens"][11]
    
4. The admin can use the search box on the top-right to search tokens on the basis of `Created By` and `Description`.

## Revoke token

1. Login into your GoCD server.
2. Go to **Admin** menu &rarr; Security &rarr; **Access Tokens Management**.
!["Navigate to admin access token"][8]

3. Find the token which you wish to revoke in `ACTIVE TOKENS` tab.
!["active access tokens"][10]

4. Click on the `Revoke` button.

5. Optionally, add a reason for revoking the token.
!["revoke access token cause"][6]

6. Click on `Revoke Token` button.
7. On success, the token just revoked will be shown in `REVOKED TOKENS` tab.
!["revoked access tokens"][9]

[1]: ../images/configuration/access-tokens/1_navigate_to_personal_access_token.png
[2]: ../images/configuration/access-tokens/2_personal_access_token_spa.png
[3]: ../images/configuration/access-tokens/3_token_description.png
[4]: ../images/configuration/access-tokens/4_newly_generated_token.png
[5]: ../images/configuration/access-tokens/5_active_tokens_list.png
[6]: ../images/configuration/access-tokens/6_revoke_cause.png
[7]: ../images/configuration/access-tokens/7_revoked_access_tokens.png
[8]: ../images/configuration/access-tokens/8_navigate_to_admin_access_token.png
[9]: ../images/configuration/access-tokens/9_admin_revoke_access_token.png
[10]: ../images/configuration/access-tokens/10_admin_active_tokens.png
[11]: ../images/configuration/access-tokens/11_admin_revoked_tokens.png
