This is the hearthstone_deck_builder app!!!!

# Render Routes

deck.js controller:
- '/' - index.ejs
- '/deck_builder/:class_id' - deck_builder.ejs
- '/decks/:id' - deck.ejs

user.js controller:
- '/login' - login-register.ejs
- '/profile' - profile.ejs
- '/users/:id' - user.ejs

card.js controller:
- '/cards/:id' - card.ejs

| controller        | route           | ejs  |
| ------------- |:-------------:| -----:|
| deck.index      | '/' | index |
| deck.show      | '/decks/:id'      |   deck |
| deck.deck_builder | '/deck_builder/:class_id'      | deck_builder |
| user.login      | '/login'      |   login-register |
| user.profile      | '/profile'      |   profile |
| user.show      | '/users/:id'      |  user  |
| card.show      | '/cards/:id'      |   card |