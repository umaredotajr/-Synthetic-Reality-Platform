;; Reality Parameters Contract

(define-map reality-parameters
  { reality-id: uint }
  {
    name: (string-ascii 50),
    description: (string-utf8 500),
    creator: principal,
    physics-rules: (list 10 (string-ascii 50)),
    visual-style: (string-ascii 50),
    interaction-mode: (string-ascii 50)
  }
)

(define-data-var reality-count uint u0)

(define-public (create-reality (name (string-ascii 50)) (description (string-utf8 500)) (physics-rules (list 10 (string-ascii 50))) (visual-style (string-ascii 50)) (interaction-mode (string-ascii 50)))
  (let
    (
      (new-reality-id (+ (var-get reality-count) u1))
    )
    (map-set reality-parameters
      { reality-id: new-reality-id }
      {
        name: name,
        description: description,
        creator: tx-sender,
        physics-rules: physics-rules,
        visual-style: visual-style,
        interaction-mode: interaction-mode
      }
    )
    (var-set reality-count new-reality-id)
    (ok new-reality-id)
  )
)

(define-public (update-reality (reality-id uint) (name (string-ascii 50)) (description (string-utf8 500)) (physics-rules (list 10 (string-ascii 50))) (visual-style (string-ascii 50)) (interaction-mode (string-ascii 50)))
  (let
    (
      (reality (unwrap! (map-get? reality-parameters { reality-id: reality-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get creator reality)) (err u403))
    (ok (map-set reality-parameters
      { reality-id: reality-id }
      (merge reality {
        name: name,
        description: description,
        physics-rules: physics-rules,
        visual-style: visual-style,
        interaction-mode: interaction-mode
      })
    ))
  )
)

(define-read-only (get-reality (reality-id uint))
  (ok (map-get? reality-parameters { reality-id: reality-id }))
)

(define-read-only (get-reality-count)
  (ok (var-get reality-count))
)

