namespace SpriteKind {
    export const Cursor = SpriteKind.create()
    export const highlight = SpriteKind.create()
    export const Piece = SpriteKind.create()
    export const PieceHitbox = SpriteKind.create()
    export const HighlightHitbox = SpriteKind.create()
    export const EnemyHitbox = SpriteKind.create()
    export const PotentialMoveSpot = SpriteKind.create()
}
function createPiece (kind: string, black: boolean, image2: Image) {
    tempSprite = sprites.create(image2, SpriteKind.Piece)
    sprites.setDataString(tempSprite, "kind", kind)
    sprites.setDataBoolean(tempSprite, "black", black)
    sprites.setDataBoolean(tempSprite, "hasMoved", false)
    sprites.setDataSprite(tempSprite, "hitbox", sprites.create(img`
        6 6 6 6 6 6 6 6 
        6 6 6 6 6 6 6 6 
        6 6 6 6 6 6 6 6 
        6 6 6 6 6 6 6 6 
        6 6 6 6 6 6 6 6 
        6 6 6 6 6 6 6 6 
        6 6 6 6 6 6 6 6 
        6 6 6 6 6 6 6 6 
        `, SpriteKind.PieceHitbox))
    sprites.setDataSprite(sprites.readDataSprite(tempSprite, "hitbox"), "parent", tempSprite)
    sprites.readDataSprite(tempSprite, "hitbox").setFlag(SpriteFlag.Invisible, true)
    return tempSprite
}
function setupBoard () {
    for (let index = 0; index <= 7; index++) {
        tiles.placeOnTile(createPiece("pawn", true, img`
            . . . . . . . . 
            . . . . . . . . 
            . . . 9 8 . . . 
            . . 9 8 8 8 . . 
            . . . 9 8 . . . 
            . . . 9 8 . . . 
            . . 9 8 8 8 . . 
            . 9 8 8 8 8 8 . 
            `), tiles.getTileLocation(index + 6, 4))
    }
    tiles.placeOnTile(createPiece("rook", true, img`
        8 . . 8 8 . . 8 
        9 8 8 9 8 8 8 8 
        9 9 8 8 9 8 8 8 
        . . 8 8 8 8 . . 
        . . 8 9 8 8 . . 
        . . 8 8 9 8 . . 
        . . 8 9 8 8 . . 
        . 8 8 8 9 8 8 . 
        `), tiles.getTileLocation(6, 3))
    tiles.placeOnTile(createPiece("rook", true, img`
        8 . . 8 8 . . 8 
        9 8 8 9 8 8 8 8 
        9 9 8 8 9 8 8 8 
        . . 8 8 8 8 . . 
        . . 8 9 8 8 . . 
        . . 8 8 9 8 . . 
        . . 8 9 8 8 . . 
        . 8 8 8 9 8 8 . 
        `), tiles.getTileLocation(13, 3))
    tiles.placeOnTile(createPiece("knight", true, img`
        . . . 8 8 9 9 . 
        . . 8 9 8 8 8 . 
        . 8 8 8 8 8 8 . 
        . . . 8 8 8 8 8 
        . . . . 8 8 8 8 
        . . . 8 8 8 8 8 
        . . 8 8 8 8 8 . 
        . 8 8 8 8 8 8 . 
        `), tiles.getTileLocation(7, 3))
    tiles.placeOnTile(createPiece("knight", true, img`
        . . . 8 8 9 9 . 
        . . 8 9 8 8 8 . 
        . 8 8 8 8 8 8 . 
        . . . 8 8 8 8 8 
        . . . . 8 8 8 8 
        . . . 8 8 8 8 8 
        . . 8 8 8 8 8 . 
        . 8 8 8 8 8 8 . 
        `), tiles.getTileLocation(12, 3))
    tiles.placeOnTile(createPiece("bishop", true, img`
        . . . . . . . . 
        . . . 8 . . . . 
        . . 8 8 8 . . . 
        . . 9 8 9 . . . 
        . 8 8 8 8 8 . . 
        . . 9 8 9 . . . 
        . 8 8 9 8 8 . . 
        8 8 8 8 8 8 8 . 
        `), tiles.getTileLocation(8, 3))
    tiles.placeOnTile(createPiece("bishop", true, img`
        . . . . . . . . 
        . . . 8 . . . . 
        . . 8 8 8 . . . 
        . . 9 8 9 . . . 
        . 8 8 8 8 8 . . 
        . . 9 8 9 . . . 
        . 8 8 9 8 8 . . 
        8 8 8 8 8 8 8 . 
        `), tiles.getTileLocation(11, 3))
    tiles.placeOnTile(createPiece("queen", true, img`
        . . 8 9 9 8 . . 
        . . . 8 8 . . . 
        . . . 9 8 . . . 
        . . . 8 8 . . . 
        . . . 8 9 . . . 
        . . 9 8 8 8 . . 
        . 8 8 8 8 9 8 . 
        8 8 8 8 8 8 8 8 
        `), tiles.getTileLocation(9, 3))
    tiles.placeOnTile(createPiece("king", true, img`
        . . . 9 8 . . . 
        . 9 9 9 8 8 8 . 
        . 8 8 8 8 8 8 . 
        . . . 8 8 . . . 
        . . 9 8 8 8 . . 
        . . . 8 8 . . . 
        . . 9 9 8 8 . . 
        . 9 9 8 8 8 8 . 
        `), tiles.getTileLocation(10, 3))
    for (let index = 0; index <= 7; index++) {
        tiles.placeOnTile(createPiece("pawn", false, img`
            . . . 3 3 . . . 
            . . . 3 3 . . . 
            . . . a a . . . 
            . . 3 3 3 3 . . 
            . . 3 3 3 3 . . 
            . a 3 3 3 3 3 . 
            . a 3 3 3 3 3 . 
            . a a a a a a . 
            `), tiles.getTileLocation(index + 6, 9))
    }
    tiles.placeOnTile(createPiece("rook", false, img`
        . 3 . 3 3 . 3 . 
        . 3 3 3 3 3 3 . 
        . . a a a a . . 
        . . . 3 3 . . . 
        . . . 3 3 . . . 
        . . . 3 3 . . . 
        . . 3 3 3 3 . . 
        . a a a a a a . 
        `), tiles.getTileLocation(6, 10))
    tiles.placeOnTile(createPiece("rook", false, img`
        . 3 . 3 3 . 3 . 
        . 3 3 3 3 3 3 . 
        . . a a a a . . 
        . . . 3 3 . . . 
        . . . 3 3 . . . 
        . . . 3 3 . . . 
        . . 3 3 3 3 . . 
        . a a a a a a . 
        `), tiles.getTileLocation(13, 10))
    tiles.placeOnTile(createPiece("knight", false, img`
        . . . a 3 a . . 
        . . a 3 3 1 3 . 
        . . a 3 3 3 3 3 
        . . a 3 3 . 3 3 
        . . . 3 3 . . . 
        . . . 3 3 . . . 
        . . 3 3 3 3 . . 
        . a a a a a a . 
        `), tiles.getTileLocation(7, 10))
    tiles.placeOnTile(createPiece("knight", false, img`
        . . . a 3 a . . 
        . . a 3 3 1 3 . 
        . . a 3 3 3 3 3 
        . . a 3 3 . 3 3 
        . . . 3 3 . . . 
        . . . 3 3 . . . 
        . . 3 3 3 3 . . 
        . a a a a a a . 
        `), tiles.getTileLocation(12, 10))
    tiles.placeOnTile(createPiece("bishop", false, img`
        . . . 3 3 . . . 
        . . a a a a . . 
        . . . 3 3 . . . 
        . . . 3 3 . . . 
        . . . 3 3 . . . 
        . . 3 3 3 3 . . 
        . a 3 3 3 3 3 . 
        . a a a a a a . 
        `), tiles.getTileLocation(8, 10))
    tiles.placeOnTile(createPiece("bishop", false, img`
        . . . 3 3 . . . 
        . . a a a a . . 
        . . . 3 3 . . . 
        . . . 3 3 . . . 
        . . . 3 3 . . . 
        . . 3 3 3 3 . . 
        . a 3 3 3 3 3 . 
        . a a a a a a . 
        `), tiles.getTileLocation(11, 10))
    tiles.placeOnTile(createPiece("queen", false, img`
        . . . 3 3 . . . 
        . . 3 3 3 3 . . 
        . . . a a . . . 
        . . 3 3 3 3 . . 
        . . . 3 3 . . . 
        . . . 3 3 . . . 
        . . 3 3 3 3 . . 
        . a a a a a a . 
        `), tiles.getTileLocation(9, 10))
    tiles.placeOnTile(createPiece("king", false, img`
        . . . 3 . . . . 
        . . 3 3 3 . . . 
        . . . 3 . . . . 
        . . 3 3 3 . . . 
        . . a a a . . . 
        . . 3 3 3 . . . 
        . . 3 3 3 . . . 
        . a a a a a . . 
        `), tiles.getTileLocation(10, 10))
}
function checkForCheck (black: boolean) {
    for (let value of sprites.allOfKind(SpriteKind.Piece)) {
        if (black != sprites.readDataBoolean(value, "black")) {
            highlight_move_spots(value, false)
        } else if (sprites.readDataString(value, "kind") == "king") {
            myKing = value
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.HighlightHitbox)) {
        if (value.overlapsWith(myKing)) {
            sprites.destroyAllSpritesOfKind(SpriteKind.HighlightHitbox)
            return true
        }
    }
    sprites.destroyAllSpritesOfKind(SpriteKind.HighlightHitbox)
    return false
}
function can_i_move_here (asker: Sprite, col: number, row: number, canCapture: boolean) {
    if (col < 6 || col > 13) {
        return false
    } else if (row < 3 || row > 10) {
        return false
    }
    tempSprite = getPieceOnSpace(col, row)
    if (tempSprite && (sprites.readDataBoolean(tempSprite, "black") == sprites.readDataBoolean(asker, "black") || !(canCapture))) {
        return false
    }
    return true
}
sprites.onOverlap(SpriteKind.PieceHitbox, SpriteKind.Cursor, function (sprite, otherSprite) {
    if (controller.A.isPressed() && sprites.readDataBoolean(sprites.readDataSprite(sprite, "parent"), "black") == blacksTurn) {
        unmovedLocation = sprite.tilemapLocation()
        highlight_move_spots(sprites.readDataSprite(sprite, "parent"), true)
        for (let value of sprites.allOfKind(SpriteKind.HighlightHitbox)) {
            value.setKind(SpriteKind.PotentialMoveSpot)
        }
        for (let value of sprites.allOfKind(SpriteKind.PotentialMoveSpot)) {
            tiles.placeOnTile(sprite, value.tilemapLocation())
            tiles.placeOnTile(sprites.readDataSprite(sprite, "parent"), value.tilemapLocation())
            if (checkForCheck(sprites.readDataBoolean(sprites.readDataSprite(sprite, "parent"), "black"))) {
                value.destroy()
            }
        }
        for (let value of sprites.allOfKind(SpriteKind.PotentialMoveSpot)) {
            value.setKind(SpriteKind.HighlightHitbox)
            tempSprite = sprites.create(img`
                5 5 5 5 5 5 5 5 
                5 . . . . . . 5 
                5 . . . . . . 5 
                5 . . . . . . 5 
                5 . . . . . . 5 
                5 . . . . . . 5 
                5 . . . . . . 5 
                5 5 5 5 5 5 5 5 
                `, SpriteKind.highlight)
            tiles.placeOnTile(tempSprite, value.tilemapLocation())
        }
        highlightedPiece = sprites.readDataSprite(sprite, "parent")
        tiles.placeOnTile(sprites.readDataSprite(sprite, "parent"), unmovedLocation)
        tiles.placeOnTile(sprite, unmovedLocation)
        if (sprites.allOfKind(SpriteKind.highlight).length == 0) {
            story.printText("No valid moves", 80, 60, 15)
        }
    }
})
function highlightBishop (piece: Sprite) {
    tempLocation = piece.tilemapLocation()
    while (tempLocation) {
        tempLocation = moveAndCheck(piece, tempLocation.column, tempLocation.row, 1, 1)
    }
    tempLocation = piece.tilemapLocation()
    while (tempLocation) {
        tempLocation = moveAndCheck(piece, tempLocation.column, tempLocation.row, 1, -1)
    }
    tempLocation = piece.tilemapLocation()
    while (tempLocation) {
        tempLocation = moveAndCheck(piece, tempLocation.column, tempLocation.row, -1, -1)
    }
    tempLocation = piece.tilemapLocation()
    while (tempLocation) {
        tempLocation = moveAndCheck(piece, tempLocation.column, tempLocation.row, -1, 1)
    }
}
function getPieceOnSpace (col: number, row: number) {
    for (let value of sprites.allOfKind(SpriteKind.Piece)) {
        if (value.tilemapLocation().column == col && value.tilemapLocation().row == row) {
            return value
        }
    }
    return spriteutils.nullConsts(spriteutils.NullConsts.Undefined)
}
function promotePawn (piece: Sprite) {
    controller.moveSprite(theCursor, 0, 0)
    story.startCutscene(function () {
        story.printText("I think this pawn deserves a promotion!", 80, 60)
        story.showPlayerChoices("queen", "rook", "knight", "bishop")
        if (sprites.readDataBoolean(piece, "black")) {
            if (story.checkLastAnswer("queen")) {
                tiles.placeOnTile(createPiece("queen", true, img`
                    . . 8 9 9 8 . . 
                    . . . 8 8 . . . 
                    . . . 9 8 . . . 
                    . . . 8 8 . . . 
                    . . . 8 9 . . . 
                    . . 9 8 8 8 . . 
                    . 8 8 8 8 9 8 . 
                    8 8 8 8 8 8 8 8 
                    `), piece.tilemapLocation())
            } else if (story.checkLastAnswer("rook")) {
                tiles.placeOnTile(createPiece("rook", true, img`
                    8 . . 8 8 . . 8 
                    9 8 8 9 8 8 8 8 
                    9 9 8 8 9 8 8 8 
                    . . 8 8 8 8 . . 
                    . . 8 9 8 8 . . 
                    . . 8 8 9 8 . . 
                    . . 8 9 8 8 . . 
                    . 8 8 8 9 8 8 . 
                    `), piece.tilemapLocation())
            } else if (story.checkLastAnswer("knight")) {
                tiles.placeOnTile(createPiece("knight", true, img`
                    . . . 8 8 9 9 . 
                    . . 8 9 8 8 8 . 
                    . 8 8 8 8 8 8 . 
                    . . . 8 8 8 8 8 
                    . . . . 8 8 8 8 
                    . . . 8 8 8 8 8 
                    . . 8 8 8 8 8 . 
                    . 8 8 8 8 8 8 . 
                    `), piece.tilemapLocation())
            } else {
                tiles.placeOnTile(createPiece("bishop", true, img`
                    . . . . . . . . 
                    . . . 8 . . . . 
                    . . 8 8 8 . . . 
                    . . 9 8 9 . . . 
                    . 8 8 8 8 8 . . 
                    . . 9 8 9 . . . 
                    . 8 8 9 8 8 . . 
                    8 8 8 8 8 8 8 . 
                    `), piece.tilemapLocation())
            }
        } else {
            if (story.checkLastAnswer("queen")) {
                tiles.placeOnTile(createPiece("queen", false, img`
                    . . . 3 3 . . . 
                    . . 3 3 3 3 . . 
                    . . . a a . . . 
                    . . 3 3 3 3 . . 
                    . . . 3 3 . . . 
                    . . . 3 3 . . . 
                    . . 3 3 3 3 . . 
                    . a a a a a a . 
                    `), piece.tilemapLocation())
            } else if (story.checkLastAnswer("rook")) {
                tiles.placeOnTile(createPiece("rook", false, img`
                    . 3 . 3 3 . 3 . 
                    . 3 3 3 3 3 3 . 
                    . . a a a a . . 
                    . . . 3 3 . . . 
                    . . . 3 3 . . . 
                    . . . 3 3 . . . 
                    . . 3 3 3 3 . . 
                    . a a a a a a . 
                    `), piece.tilemapLocation())
            } else if (story.checkLastAnswer("knight")) {
                tiles.placeOnTile(createPiece("knight", false, img`
                    . . . a 3 a . . 
                    . . a 3 3 1 3 . 
                    . . a 3 3 3 3 3 
                    . . a 3 3 . 3 3 
                    . . . 3 3 . . . 
                    . . . 3 3 . . . 
                    . . 3 3 3 3 . . 
                    . a a a a a a . 
                    `), piece.tilemapLocation())
            } else {
                tiles.placeOnTile(createPiece("bishop", false, img`
                    . . . 3 3 . . . 
                    . . a a a a . . 
                    . . . 3 3 . . . 
                    . . . 3 3 . . . 
                    . . . 3 3 . . . 
                    . . 3 3 3 3 . . 
                    . a 3 3 3 3 3 . 
                    . a a a a a a . 
                    `), piece.tilemapLocation())
            }
        }
        piece.destroy()
        sprites.readDataSprite(piece, "hitbox").destroy()
        controller.moveSprite(theCursor, 50, 50)
    })
}
function possiblyHighlight (sprite: Sprite, col: number, row: number, canCapture: boolean) {
    if (can_i_move_here(sprite, col, row, canCapture)) {
        tempSprite = sprites.create(img`
            5 5 5 5 5 5 5 5 
            5 7 7 7 7 7 7 5 
            5 7 7 7 7 7 7 5 
            5 7 7 7 7 7 7 5 
            5 7 7 7 7 7 7 5 
            5 7 7 7 7 7 7 5 
            5 7 7 7 7 7 7 5 
            5 5 5 5 5 5 5 5 
            `, SpriteKind.HighlightHitbox)
        tiles.placeOnTile(tempSprite, tiles.getTileLocation(col, row))
        tempSprite.setFlag(SpriteFlag.Invisible, true)
    }
}
function highlight_move_spots (piece: Sprite, destroyExistingHighlights: boolean) {
    highlightedPiece = piece
    if (destroyExistingHighlights) {
        sprites.destroyAllSpritesOfKind(SpriteKind.HighlightHitbox)
        sprites.destroyAllSpritesOfKind(SpriteKind.highlight)
    }
    if (sprites.readDataString(piece, "kind") == "pawn") {
        if (sprites.readDataBoolean(piece, "black")) {
            if (piece.tilemapLocation().row == 4) {
                possiblyHighlight(piece, piece.tilemapLocation().column, piece.tilemapLocation().row + 1, false)
                if (!(getPieceOnSpace(piece.tilemapLocation().column, piece.tilemapLocation().row + 1))) {
                    possiblyHighlight(piece, piece.tilemapLocation().column, piece.tilemapLocation().row + 2, false)
                }
            } else {
                possiblyHighlight(piece, piece.tilemapLocation().column, piece.tilemapLocation().row + 1, false)
            }
            if (getPieceOnSpace(piece.tilemapLocation().column + 1, piece.tilemapLocation().row + 1)) {
                possiblyHighlight(piece, piece.tilemapLocation().column + 1, piece.tilemapLocation().row + 1, true)
            }
            if (getPieceOnSpace(piece.tilemapLocation().column - 1, piece.tilemapLocation().row + 1)) {
                possiblyHighlight(piece, piece.tilemapLocation().column - 1, piece.tilemapLocation().row + 1, true)
            }
            if (enpassantpportunity) {
                if (piece.tilemapLocation().row == enpassantpportunity.tilemapLocation().row) {
                    if (Math.abs(piece.tilemapLocation().column - enpassantpportunity.tilemapLocation().column) == 1) {
                        possiblyHighlight(piece, enpassantpportunity.tilemapLocation().column, piece.tilemapLocation().row + 1, true)
                    }
                }
            }
        } else {
            if (piece.tilemapLocation().row == 9) {
                possiblyHighlight(piece, piece.tilemapLocation().column, piece.tilemapLocation().row - 1, false)
                if (!(getPieceOnSpace(piece.tilemapLocation().column, piece.tilemapLocation().row - 1))) {
                    possiblyHighlight(piece, piece.tilemapLocation().column, piece.tilemapLocation().row - 2, false)
                }
            } else {
                possiblyHighlight(piece, piece.tilemapLocation().column, piece.tilemapLocation().row - 1, false)
            }
            if (getPieceOnSpace(piece.tilemapLocation().column + 1, piece.tilemapLocation().row - 1)) {
                possiblyHighlight(piece, piece.tilemapLocation().column + 1, piece.tilemapLocation().row - 1, true)
            }
            if (getPieceOnSpace(piece.tilemapLocation().column - 1, piece.tilemapLocation().row - 1)) {
                possiblyHighlight(piece, piece.tilemapLocation().column - 1, piece.tilemapLocation().row - 1, true)
            }
            if (enpassantpportunity) {
                if (piece.tilemapLocation().row == enpassantpportunity.tilemapLocation().row) {
                    if (Math.abs(piece.tilemapLocation().column - enpassantpportunity.tilemapLocation().column) == 1) {
                        possiblyHighlight(piece, enpassantpportunity.tilemapLocation().column, piece.tilemapLocation().row - 1, true)
                    }
                }
            }
        }
    } else if (sprites.readDataString(piece, "kind") == "knight") {
        possiblyHighlight(piece, piece.tilemapLocation().column + 1, piece.tilemapLocation().row + 2, true)
        possiblyHighlight(piece, piece.tilemapLocation().column - 1, piece.tilemapLocation().row + 2, true)
        possiblyHighlight(piece, piece.tilemapLocation().column - 1, piece.tilemapLocation().row - 2, true)
        possiblyHighlight(piece, piece.tilemapLocation().column + 1, piece.tilemapLocation().row - 2, true)
        possiblyHighlight(piece, piece.tilemapLocation().column + 2, piece.tilemapLocation().row - 1, true)
        possiblyHighlight(piece, piece.tilemapLocation().column + 2, piece.tilemapLocation().row + 1, true)
        possiblyHighlight(piece, piece.tilemapLocation().column - 2, piece.tilemapLocation().row + 1, true)
        possiblyHighlight(piece, piece.tilemapLocation().column - 2, piece.tilemapLocation().row - 1, true)
    } else if (sprites.readDataString(piece, "kind") == "rook") {
        highlightRook(piece)
    } else if (sprites.readDataString(piece, "kind") == "bishop") {
        highlightBishop(piece)
    } else if (sprites.readDataString(piece, "kind") == "king") {
        possiblyHighlight(piece, piece.tilemapLocation().column - 1, piece.tilemapLocation().row - 0, true)
        possiblyHighlight(piece, piece.tilemapLocation().column + 1, piece.tilemapLocation().row - 0, true)
        possiblyHighlight(piece, piece.tilemapLocation().column + 0, piece.tilemapLocation().row - 1, true)
        possiblyHighlight(piece, piece.tilemapLocation().column + 0, piece.tilemapLocation().row + 1, true)
        possiblyHighlight(piece, piece.tilemapLocation().column + 1, piece.tilemapLocation().row + 1, true)
        possiblyHighlight(piece, piece.tilemapLocation().column - 1, piece.tilemapLocation().row + 1, true)
        possiblyHighlight(piece, piece.tilemapLocation().column - 1, piece.tilemapLocation().row - 1, true)
        possiblyHighlight(piece, piece.tilemapLocation().column + 1, piece.tilemapLocation().row - 1, true)
        tempLocation = piece.tilemapLocation()
        while (tempLocation.column < 13) {
            tempLocation = tiles.getTileLocation(tempLocation.column + 1, tempLocation.row)
            tempSprite = getPieceOnSpace(tempLocation.column, tempLocation.row)
            if (!(sprites.readDataBoolean(tempSprite, "hasMoved")) && sprites.readDataString(tempSprite, "kind") == "rook") {
                possiblyHighlight(piece, piece.tilemapLocation().column + 2, piece.tilemapLocation().row, true)
                break;
            }
        }
        while (tempLocation.column > 6) {
            tempLocation = tiles.getTileLocation(tempLocation.column - 1, tempLocation.row)
            tempSprite = getPieceOnSpace(tempLocation.column, tempLocation.row)
            if (!(sprites.readDataBoolean(tempSprite, "hasMoved")) && sprites.readDataString(tempSprite, "kind") == "rook") {
                possiblyHighlight(piece, piece.tilemapLocation().column - 2, piece.tilemapLocation().row, true)
                break;
            }
        }
    } else if (sprites.readDataString(piece, "kind") == "queen") {
        highlightRook(piece)
        highlightBishop(piece)
    } else {
    	
    }
}
function moveAndCheck (piece: Sprite, col: number, row: number, dx: number, dy: number) {
    possiblyHighlight(piece, col + dx, row + dy, true)
    if (can_i_move_here(piece, col + dx, row + dy, false)) {
        return tiles.getTileLocation(col + dx, row + dy)
    }
    return spriteutils.nullConsts(spriteutils.NullConsts.Undefined)
}
function getNotationSpace (char: string, num: number) {
    return tiles.getTileLocation("abcdefgh".indexOf(char) + 6, 8 - num + 3)
}
function highlightRook (piece: Sprite) {
    tempLocation = piece.tilemapLocation()
    while (tempLocation) {
        tempLocation = moveAndCheck(piece, tempLocation.column, tempLocation.row, 0, 1)
    }
    tempLocation = piece.tilemapLocation()
    while (tempLocation) {
        tempLocation = moveAndCheck(piece, tempLocation.column, tempLocation.row, 0, -1)
    }
    tempLocation = piece.tilemapLocation()
    while (tempLocation) {
        tempLocation = moveAndCheck(piece, tempLocation.column, tempLocation.row, 1, 0)
    }
    tempLocation = piece.tilemapLocation()
    while (tempLocation) {
        tempLocation = moveAndCheck(piece, tempLocation.column, tempLocation.row, -1, 0)
    }
}
sprites.onOverlap(SpriteKind.Cursor, SpriteKind.HighlightHitbox, function (sprite, otherSprite) {
    if (controller.A.isPressed()) {
        sprites.destroyAllSpritesOfKind(SpriteKind.highlight)
        sprites.destroyAllSpritesOfKind(SpriteKind.HighlightHitbox)
        tempSprite = getPieceOnSpace(otherSprite.tilemapLocation().column, otherSprite.tilemapLocation().row)
        if (tempSprite) {
            tempSprite.destroy()
            sprites.readDataSprite(tempSprite, "hitbox").destroy()
            if (sprites.readDataString(tempSprite, "kind") == "king") {
                if (sprites.readDataBoolean(highlightedPiece, "black")) {
                    game.splash("Black wins!")
                } else {
                    game.splash("White wins!")
                }
                game.reset()
            }
        }
        sprites.setDataBoolean(highlightedPiece, "hasMoved", true)
        if (sprites.readDataString(highlightedPiece, "kind") == "king" && Math.abs(otherSprite.tilemapLocation().column - highlightedPiece.tilemapLocation().column) == 2) {
            if (otherSprite.tilemapLocation().column < highlightedPiece.tilemapLocation().column) {
                tempSprite = getPieceOnSpace(6, highlightedPiece.tilemapLocation().row)
                tiles.placeOnTile(tempSprite, highlightedPiece.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
            } else {
                tempSprite = getPieceOnSpace(13, highlightedPiece.tilemapLocation().row)
                tiles.placeOnTile(tempSprite, highlightedPiece.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))
            }
        }
        if (enpassantpportunity && sprites.readDataString(highlightedPiece, "kind") == "pawn") {
            if (sprites.readDataBoolean(highlightedPiece, "black")) {
                if (otherSprite.tilemapLocation().row == enpassantpportunity.tilemapLocation().row + 1 && otherSprite.tilemapLocation().column == enpassantpportunity.tilemapLocation().column) {
                    enpassantpportunity.destroy()
                    sprites.readDataSprite(enpassantpportunity, "hitbox").destroy()
                }
            } else {
                if (otherSprite.tilemapLocation().row == enpassantpportunity.tilemapLocation().row - 1 && otherSprite.tilemapLocation().column == enpassantpportunity.tilemapLocation().column) {
                    enpassantpportunity.destroy()
                    sprites.readDataSprite(enpassantpportunity, "hitbox").destroy()
                }
            }
        }
        if (sprites.readDataString(highlightedPiece, "kind") == "pawn" && Math.abs(otherSprite.tilemapLocation().row - highlightedPiece.tilemapLocation().row) == 2) {
            enpassantpportunity = highlightedPiece
        } else {
            enpassantpportunity = spriteutils.nullConsts(spriteutils.NullConsts.Undefined)
        }
        tiles.placeOnTile(highlightedPiece, otherSprite.tilemapLocation())
        if (sprites.readDataString(highlightedPiece, "kind") == "pawn") {
            if (sprites.readDataBoolean(highlightedPiece, "black")) {
                if (otherSprite.tilemapLocation().row == 10) {
                    promotePawn(highlightedPiece)
                }
            } else {
                if (otherSprite.tilemapLocation().row == 3) {
                    promotePawn(highlightedPiece)
                }
            }
        }
        highlightedPiece = spriteutils.nullConsts(spriteutils.NullConsts.Undefined)
        blacksTurn = !(blacksTurn)
    }
})
let enpassantpportunity: Sprite = null
let tempLocation: tiles.Location = null
let highlightedPiece: Sprite = null
let unmovedLocation: tiles.Location = null
let myKing: Sprite = null
let tempSprite: Sprite = null
let blacksTurn = false
let theCursor: Sprite = null
tiles.loadMap(tiles.createSmallMap(tilemap`level2`))
setupBoard()
theCursor = sprites.create(img`
    . . f f . . . . . . 
    . f 1 b f f f f . . 
    . f 1 1 f 1 f 1 f . 
    . f b 1 1 b 1 b f . 
    . . f b 1 1 1 1 1 f 
    . f f f 1 1 1 1 1 f 
    f 1 b f 1 1 1 1 1 f 
    f 1 1 b 1 1 1 1 1 f 
    . f 1 1 1 1 1 1 f . 
    . . f f f f f f . . 
    `, SpriteKind.Cursor)
theCursor.setFlag(SpriteFlag.Ghost, true)
controller.moveSprite(theCursor, 50, 50)
let cursorTarget = sprites.create(img`
    3 
    `, SpriteKind.Cursor)
cursorTarget.setFlag(SpriteFlag.Invisible, true)
blacksTurn = false
game.onUpdate(function () {
    cursorTarget.top = theCursor.top
    cursorTarget.x = theCursor.x - 2
})
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.PieceHitbox)) {
        spriteutils.placeAngleFrom(
        value,
        0,
        0,
        sprites.readDataSprite(value, "parent")
        )
    }
})
