FROM golang:1.14-alpine AS build_base

WORKDIR /go/src/app
COPY app.go .

# We use these flags in production and our app relies heavily on reflection. No problems at all. -s -w strips debug information and debug tables, as far as I know. You can also use -trimpath -ldflags... To strip your computers file paths from error messages
# https://www.reddit.com/r/golang/comments/zvqell/comment/j1qki2u/
RUN go build -trimpath -ldflags "-s -w" -o ./go-app .

# FROM alpine:latest
FROM hello-world

COPY --from=build_base /go/src/app/go-app /app/go-app

CMD ["/app/go-app"]

