;; Reality NFT Contract

(define-non-fungible-token reality-nft uint)

(define-map reality-nft-data
  { reality-id: uint }
  {
    name: (string-ascii 50),
    description: (string-utf8 500),
    creator: principal,
    reality-parameters-id: uint
  }
)

(define-data-var last-reality-id uint u0)

(define-public (mint-reality-nft (name (string-ascii 50)) (description (string-utf8 500)) (reality-parameters-id uint))
  (let
    (
      (new-reality-id (+ (var-get last-reality-id) u1))
    )
    (try! (nft-mint? reality-nft new-reality-id tx-sender))
    (map-set reality-nft-data
      { reality-id: new-reality-id }
      {
        name: name,
        description: description,
        creator: tx-sender,
        reality-parameters-id: reality-parameters-id
      }
    )
    (var-set last-reality-id new-reality-id)
    (ok new-reality-id)
  )
)

(define-public (transfer-reality-nft (reality-id uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender (unwrap! (nft-get-owner? reality-nft reality-id) (err u404))) (err u403))
    (try! (nft-transfer? reality-nft reality-id tx-sender recipient))
    (ok true)
  )
)

(define-read-only (get-reality-nft-data (reality-id uint))
  (ok (map-get? reality-nft-data { reality-id: reality-id }))
)

(define-read-only (get-reality-nft-owner (reality-id uint))
  (ok (nft-get-owner? reality-nft reality-id))
)

