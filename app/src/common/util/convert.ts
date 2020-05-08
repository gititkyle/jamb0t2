export function toArgs (message: string): string[] {
    return message.split(' ').slice(1);
}

export function toCommand (message: string): string {
    return message.split(' ')[0];
}

export function toModuleId (message: string): string {
    return message.match(/(?<=!)[\w]*/)[0];
}
